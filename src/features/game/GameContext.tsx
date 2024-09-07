import React, { createContext, Dispatch, useReducer } from 'react';

import { Round } from '../../lib/types/global';
import { Game } from './Game';

type Game = {
  round: number;
  scores: { player: number; opponent: number };
  history: Round[];
  //More props: rules pour éventuellement d'autres regles ? id pour identifier une partie en particulier ?
};

type GameAction =
  | {
      type: 'INCREMENT_ROUND';
      value: number;
    }
  | { type: 'ADD_SCORE'; scoringPlayer: 'player' | 'opponent'; value: number }
  | { type: 'UPDATE_HISTORY'; value: Round[] };

export type GameContextType = {
  state: Game;
  dispatch: Dispatch<GameAction>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: Game = {
  round: 0,
  scores: { player: 0, opponent: 0 },
  history: [],
};

const gameReducer = (state: Game, action: GameAction): Game => {
  switch (action.type) {
    case 'INCREMENT_ROUND':
      return { ...state, round: state.round + action.value };
    case 'ADD_SCORE':
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.scoringPlayer]:
            state.scores[action.scoringPlayer] + action.value,
        },
      };
    case 'UPDATE_HISTORY':
      return {
        ...state,
        history: [...state.history, ...action.value],
      };
    default:
      return state;
  }
};

type GameProviderProps = {
  children: React.ReactNode;
};

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
