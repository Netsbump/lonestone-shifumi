import type React from 'react';
import { createContext, useCallback, useReducer } from 'react';

import type { Round, RoundDTO } from '@packages/dtos';
import { type GameDTO, type Result, Status } from '@packages/dtos';
import { createGame, fetchGame } from '../../lib/api/game';
import { createRound } from '../../lib/api/round';
import type { Choice, Game, RoundStatus } from '../../lib/types/game.types';
import { FINISHED, IN_PROGRESS, NOT_STARTED } from '../../lib/utils/constants';

const RESET = 'RESET';
const PLAY = 'PLAY';
const START = 'START';
const NEXTROUND = 'NEXTROUND';
const CREATE = 'CREATE';

const initialGameState: Game = {
  gameId: 0,
  gameStatus: Status.NOT_STARTED,
  roundStatus: [
    {
      roundNumber: 0,
      timerProgressBarStatus: NOT_STARTED,
    },
  ],
  history: [],
  players: {
    player: {
      name: '',
      avatar: {
        imgPath: '',
        alt: '',
      },
    },
    opponent: {
      name: '',
      avatar: {
        imgPath: '',
        alt: '',
      },
    },
  },
};

type GameAction =
  | { type: typeof PLAY; value: { round: RoundDTO; game: GameDTO } }
  | { type: typeof CREATE; value: GameDTO }
  | { type: typeof START }
  | { type: typeof RESET }
  | { type: typeof NEXTROUND };

// Action creators
const create = (gameData: GameDTO): GameAction => ({
  type: CREATE,
  value: gameData,
});

const start = (): GameAction => ({
  type: START,
});

const play = (roundCreated: RoundDTO, game: GameDTO): GameAction => ({
  type: PLAY,
  value: {
    round: roundCreated,
    game: game,
  },
});

const reset = (): GameAction => ({
  type: RESET,
});

const nextRound = (): GameAction => ({
  type: NEXTROUND,
});

const gameReducer = (state: Game, action: GameAction): Game => {
  switch (action.type) {
    case CREATE: {
      const { players, id } = action.value;

      return {
        ...state,
        gameId: id,
        players: {
          player: {
            name: players[0].name,
            avatar: {
              imgPath: players[0].avatar_path,
              alt: `avatar ${players[0].name}`,
            },
          },
          opponent: {
            name: players[1].name,
            avatar: {
              imgPath: players[1].avatar_path,
              alt: `avatar ${players[1].name}`,
            },
          },
        },
      };
    }
    case START: {

      return {
        ...state,
        gameStatus: Status.IN_PROGRESS,
      };
    }
    case PLAY: {
      const { round, game } = action.value;

      const newRound: Round = {
        playerChoice: round.choices[0].action as Choice,
        opponentChoice: round.choices[1].action as Choice,
        roundResult: round.roundResult as Result,
      };

      // Add this new round to the history
      const updateHistory = [...state.history, newRound];

      // Updte game status
      const gameStatus = game.status;

      // Create a new round status for the next round, incrementing the round number
      const newRoundStatus: RoundStatus = {
        roundNumber: round.number,
        timerProgressBarStatus: IN_PROGRESS,
      };
      const updateRoundStatus = [...state.roundStatus, newRoundStatus];

      // Return the updated state with new round status, updated game history, and game status
      return {
        ...state,
        roundStatus: updateRoundStatus,
        gameStatus,
        history: updateHistory,
      };
    }
    case RESET: {
      return initialGameState;
    }
    case NEXTROUND: {
      // Get the index of the last round status in the roundStatus array
      const lastRoundStatusIndex = state.roundStatus.length - 1;

      // Create a copy of the roundStatus array to avoid mutating the original state directly
      const updatedRoundStatus = [...state.roundStatus];

      // Update the timerProgressBarStatus of the last round to FINISHED
      updatedRoundStatus[lastRoundStatusIndex] = {
        ...updatedRoundStatus[lastRoundStatusIndex],
        timerProgressBarStatus: FINISHED,
      };

      // Return the updated state with the modified roundStatus array
      return {
        ...state,
        roundStatus: updatedRoundStatus,
      };
    }
    default:
      return state;
  }
};

export type GameContextType = {
  state: Game;
  create: (playerChoice: string) => Promise<GameDTO>;
  start: () => void;
  play: (playerChoice: Choice) => void;
  reset: () => void;
  nextRound: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: React.ReactNode;
};

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const createCallBack = useCallback(async (playerName: string): Promise<GameDTO> => {
    const gameData = await createGame({
      playerName: playerName,
      opponentName: 'J-Ordi',
    });

    dispatch(create(gameData));
    return gameData;
  }, []);

  const startCallback = useCallback(() => {
    dispatch(start());
  }, []);

  const playCallback = useCallback(
    async (playerChoice: Choice) => {
      const roundCreated = await createRound({
        gameId: state.gameId,
        player: { name: state.players.player.name, action: playerChoice },
      });
      const game = await fetchGame(state.gameId);

      dispatch(play(roundCreated, game));
    },
    [state.gameId, state.players.player.name],
  );

  const resetCallback = useCallback(() => {
    dispatch(reset());
  }, []);

  const nextRoundCallBack = useCallback(() => {
    dispatch(nextRound());
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        create: createCallBack,
        play: playCallback,
        start: startCallback,
        reset: resetCallback,
        nextRound: nextRoundCallBack,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
