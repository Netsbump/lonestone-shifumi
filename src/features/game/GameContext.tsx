import React, { createContext, useCallback, useReducer } from 'react';

import player1 from '../../assets/images/avatar-human.svg';
import player2 from '../../assets/images/avatar-robot.svg';
import { Choice, Game, RoundStatus } from '../../lib/types/game.types';
import {
  FINISHED,
  FORFEIT,
  IN_PROGRESS,
  NOT_STARTED,
  OPPONENT,
  PLAYER,
} from '../../lib/utils/constants';
import { determineRoundResult, getRandomChoice } from '../../lib/utils/game.logic';

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
        playerChoice === FORFEIT ? 'opponent' : determineRoundResult(playerChoice, opponentChoice);

      //Add newRound to history
      const newRound = {
        playerChoice,
        opponentChoice,
        roundResult,
      };
      const updateHistory = [...state.history, newRound];

      // Check if either player has won the game by reaching 5 wins
      const playerWins = updateHistory.filter((round) => round.roundResult === PLAYER).length;
      const opponentWins = updateHistory.filter((round) => round.roundResult === OPPONENT).length;

      let gameStatus = state.gameStatus;
      if (playerWins === 5 || opponentWins === 5) {
        gameStatus = FINISHED;
      }

      //Add newRoundStatus to roundStatus
      const lastRoundStatus = state.roundStatus[state.roundStatus.length - 1];
      const newRoundStatus: RoundStatus = {
        roundNumber: lastRoundStatus.roundNumber + 1,
        timerProgressBarStatus: IN_PROGRESS,
      };

      const updateRoundStatus = [...state.roundStatus, newRoundStatus];

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
      const lastRoundStatusIndex = state.roundStatus.length - 1;
      const updatedRoundStatus = [...state.roundStatus];
      updatedRoundStatus[lastRoundStatusIndex] = {
        ...updatedRoundStatus[lastRoundStatusIndex],
        timerProgressBarStatus: FINISHED,
      };

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
