import React, { createContext, useCallback, useReducer } from 'react';

import { Result, Round } from '../../lib/types/global';
import { OPPONENT, PLAYER } from '../../lib/utils/constants';
import { Game } from './Game';

export const INCREMENT_ROUND = 'INCREMENT_ROUND';
export const ADD_SCORE = 'ADD_SCORE';
export const UPDATE_HISTORY = 'UPDATE_HISTORY';

type Game = {
  round: number;
  scores: { player: number; opponent: number };
  history: Round[];
  //More props: rules pour éventuellement d'autres regles ? id pour identifier une partie en particulier ?
};

export type GameAction =
  | {
      type: typeof INCREMENT_ROUND;
      value: number;
    }
  | {
      type: typeof ADD_SCORE;
      scoringPlayer: typeof PLAYER | typeof OPPONENT;
      value: number;
    }
  | { type: typeof UPDATE_HISTORY; value: Round };

const initialState: Game = {
  round: 0,
  scores: { player: 0, opponent: 0 },
  history: [],
};

// Action creators
const addScore = (roundResult: Result): GameAction => ({
  type: ADD_SCORE,
  scoringPlayer: roundResult === PLAYER ? PLAYER : OPPONENT,
  value: 1,
});

const updateHistory = (round: Round): GameAction => ({
  type: UPDATE_HISTORY,
  value: round,
});

const incrementRound = (): GameAction => ({
  type: INCREMENT_ROUND,
  value: 1,
});

const gameReducer = (state: Game, action: GameAction): Game => {
  switch (action.type) {
    case INCREMENT_ROUND:
      return { ...state, round: state.round + action.value };
    case ADD_SCORE:
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.scoringPlayer]:
            state.scores[action.scoringPlayer] + action.value,
        },
      };
    case UPDATE_HISTORY:
      return {
        ...state,
        history: [...state.history, action.value],
      };
    default:
      return state;
  }
};

export type GameContextType = {
  state: Game;
  addScore: (roundResult: Result) => void;
  updateHistory: (round: Round) => void;
  incrementRound: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: React.ReactNode;
};

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addScoreCallback = useCallback((roundResult: Result) => {
    dispatch(addScore(roundResult));
  }, []);

  const updateScoreCallback = useCallback((round: Round) => {
    dispatch(updateHistory(round));
  }, []);

  const incrementRoundCallback = useCallback(() => {
    dispatch(incrementRound());
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        addScore: addScoreCallback,
        updateHistory: updateScoreCallback,
        incrementRound: incrementRoundCallback,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
