import React from 'react';

import { GameBoard } from '../features/gameboard/components/GameBoard';

export const Homepage: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto h-screen w-full">
      <header>
        <h2 className="text-light-blue">Shifumi !</h2>
      </header>

      <GameBoard />
    </div>
  );
};
