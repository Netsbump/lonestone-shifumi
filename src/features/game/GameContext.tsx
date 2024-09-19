import React, { createContext, useCallback, useReducer } from 'react';

import player1 from '../../assets/images/avatar-human.svg';
import player2 from '../../assets/images/avatar-robot.svg';
import { Choice, Game } from '../../lib/types/game.types';
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

const initialGameState: Game = {
  gameStatus: NOT_STARTED,
  currentRound: 0,
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
  | { type: typeof RESET };

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

      //Add newRound to history
      const newRound = {
        playerChoice,
        opponentChoice,
        roundResult,
      };
      const updateHistory = [...state.history, newRound];

      // Check if either player has won the game by reaching 5 wins
      const playerWins = updateHistory.filter(
        (round) => round.roundResult === PLAYER,
      ).length;
      const opponentWins = updateHistory.filter(
        (round) => round.roundResult === OPPONENT,
      ).length;

      let gameStatus = state.gameStatus;
      if (playerWins === 5 || opponentWins === 5) {
        gameStatus = FINISHED;
      }

      return {
        ...state,
        currentRound: state.currentRound + 1,
        gameStatus,
        history: updateHistory,
      };
    }
    case RESET: {
      return initialGameState;
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

  return (
    <GameContext.Provider
      value={{
        state,
        play: playCallback,
        start: startCallback,
        reset: resetCallback,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
