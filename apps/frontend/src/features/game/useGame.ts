import { useContext } from 'react';

import { GameContext, type GameContextType } from './GameContext';

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('GameContext must be used within a GameProvider');
  }
  return context;
};
