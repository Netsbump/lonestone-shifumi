import React from 'react';

import { GameContainer } from '../../../ui/containers/GameContainer';
import { RoundDisplay } from './RoundDiplay';

export const GameScreen: React.FC = () => {
  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center">
          <div>Jouez !</div>
        </div>
      </div>
    </GameContainer>
  );
};
