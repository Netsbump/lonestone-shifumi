import type React from 'react';
import { createContext, useCallback, useReducer } from 'react';

import player1 from '../../assets/images/avatar-human.svg';
import player2 from '../../assets/images/avatar-robot.svg';
import type { Choice, Game, RoundStatus } from '../../lib/types/game.types';
import {
  FINISHED,
  FORFEIT,
  IN_PROGRESS,
  NOT_STARTED,
  OPPONENT,
  PLAYER,
} from '../../lib/utils/constants';
import {
  determineRoundResult,
  getRandomChoice,
} from '../../lib/utils/game.logic';

const RESET = 'RESET';
const PLAY = 'PLAY';
const START = 'START';
const NEXTROUND = 'NEXTROUND';

const initialGameState: Game = {
  gameStatus: NOT_STARTED,
  roundStatus: [
    {
      roundNumber: 0,
      timerProgressBarStatus: NOT_STARTED,
    },
  ],
  history: [],
  players: {
    player: {
      name: 'Moi', //Initialiser à "Moi" en v1
      avatar: {
        imgPath: player1,
        alt: 'avatar player 1',
      },
    },
    opponent: {
      name: 'J-Ordi', //Initialiser à "J-Ordi" en v1
      avatar: {
        imgPath: player2,
        alt: 'avatar player 2',
      },
    },
  },
};

type GameAction =
  | { type: typeof PLAY; value: Choice }
  | { type: typeof START }
  | { type: typeof RESET }
  | { type: typeof NEXTROUND };

// Action creators
const start = (): GameAction => ({
  type: START,
});

const play = (playerChoice: Choice): GameAction => ({
  type: PLAY,
  value: playerChoice,
});

const reset = (): GameAction => ({
  type: RESET,
});

const nextRound = (): GameAction => ({
  type: NEXTROUND,
});

const gameReducer = (state: Game, action: GameAction): Game => {
  switch (action.type) {
    case START: {
      return {
        ...state,
        gameStatus: IN_PROGRESS,
      };
    }
    case PLAY: {
      const playerChoice = action.value;
      const opponentChoice = getRandomChoice();
      const roundResult =
        playerChoice === FORFEIT
          ? 'opponent'
          : determineRoundResult(playerChoice, opponentChoice);

      // Create a new round object containing player and opponent choices, and the round result
      const newRound = {
        playerChoice,
        opponentChoice,
        roundResult,
      };
      // Add this new round to the history
      const updateHistory = [...state.history, newRound];

      // Check if either player has won the game by reaching 5 wins
      const playerWins = updateHistory.filter(
        (round) => round.roundResult === PLAYER,
      ).length;
      const opponentWins = updateHistory.filter(
        (round) => round.roundResult === OPPONENT,
      ).length;

      // By default, keep the current game status
      let gameStatus = state.gameStatus;

      // If either the player or opponent reaches 5 wins, the game is marked as finished
      if (playerWins === 5 || opponentWins === 5) {
        gameStatus = FINISHED;
      }

      // Get the last round status (to determine the next round number)
      const lastRoundStatus = state.roundStatus[state.roundStatus.length - 1];

      // Create a new round status for the next round, incrementing the round number
      const newRoundStatus: RoundStatus = {
        roundNumber: lastRoundStatus.roundNumber + 1,
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

      //Create a copy of the roundStatus array to avoid mutating the original state directly
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

  const startCallback = useCallback(() => {
    dispatch(start());
  }, []);

  const playCallback = useCallback((playerChoice: Choice) => {
    dispatch(play(playerChoice));
  }, []);

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

export { GameProvider, GameContext };
