import type React from 'react';
import { createContext, useCallback, useReducer } from 'react';

import type { RoundDTO } from '@packages/dtos';
import { type GameDTO, Status } from '@packages/dtos';
import { fetchGame } from '../../lib/api/game';
import { createRound } from '../../lib/api/round';
import type { Choice, Game, TimerProgressBar } from '../../lib/types/game.types';
import { FINISHED, IN_PROGRESS } from '../../lib/utils/constants';

const RESET = 'RESET';
const PLAY = 'PLAY';
const START = 'START';
const NEXTROUND = 'NEXTROUND';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';

const initialGameState: Game = {
  gameId: 0,
  gameStatus: Status.NOT_STARTED,
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
  | { type: typeof UPDATE; value: GameDTO }
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

const update = (gameData: GameDTO): GameAction => ({
  type: UPDATE,
  value: gameData,
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
    case UPDATE: {
      const { players, id, status, historyRound } = action.value;

      let updateHistory: Array<Omit<RoundDTO, 'id' | 'game'> & { timerRoundStatus: TimerProgressBar }> = [];

      if (historyRound) {
        for (let i = 0; i < historyRound.length; i++) {
          const round = historyRound[i];
          const isLastRound = i === historyRound.length - 1; // Vérifie si c'est le dernier round
    
          // Ajoute le round avec le timer approprié
          updateHistory.push({
            number: round.number,
            choices: [
              { playerID: round.choices[0].playerID, action: round.choices[0].action },
              { playerID: round.choices[1].playerID, action: round.choices[1].action }
            ],
            roundResult: round.roundResult,
            timerRoundStatus: isLastRound ? IN_PROGRESS : FINISHED, // Dernier round à IN_PROGRESS pour afficher le dernier round joué ajouter un etat "reprendre la partie qui fait passer NOT STARTED EN IN PROGRESS ? autres à FINISHED
          });
        }
      } else {
        updateHistory = [...state.history]; // Si pas de historyRound, on garde l'historique existant
      }
      
      return {
        ...state,
        gameId: id,
        gameStatus: status,
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
        history: updateHistory,
      };
    }
    case PLAY: {
      const { round, game } = action.value;

      const newRound: Omit<RoundDTO, 'id' | 'game'> & { timerRoundStatus: TimerProgressBar } = {
        number: round.number,
        choices: [
          { playerID: round.choices[0].playerID, action: round.choices[0].action },
          { playerID: round.choices[1].playerID, action: round.choices[1].action }
        ],
        roundResult: round.roundResult,
        timerRoundStatus: IN_PROGRESS
      };

      // Add this new round to the history
      const updateHistory = [...state.history, newRound];

      // Update game status
      const gameStatus = game.status;

      // Return the updated state with new round status, updated game history, and game status
      return {
        ...state,
        gameStatus,
        history: updateHistory,
      };
    }
    case RESET: {
      return initialGameState;
    }
    case NEXTROUND: {

      const updatedHistory = [...state.history];

      // Obtenir l'index du dernier round dans l'historique
      const lastRoundIndex = updatedHistory.length - 1;

      // Si un round existe, on met à jour son statut à FINISHED
      if (lastRoundIndex >= 0) {
        updatedHistory[lastRoundIndex] = {
          ...updatedHistory[lastRoundIndex],
          timerRoundStatus: FINISHED, // Le dernier round est terminé
        };
      }

      // Return the updated state with the modified roundStatus array
      return {
        ...state,
        history: updatedHistory,
      };
    }
    default:
      return state;
  }
};

export type GameContextType = {
  state: Game;
  create: (gameData: GameDTO) => void;
  update: (gameData: GameDTO) => void;
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

  const createCallBack = useCallback((gameData: GameDTO) => {
    dispatch(create(gameData));
  }, []);

  const updateCallBack = useCallback((gameData: GameDTO) => {
    dispatch(update(gameData));
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
        update: updateCallBack,
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
