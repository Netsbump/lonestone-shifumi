import React from 'react';

import { GameBoard } from '../features/game/GameBoard';

export const Homepage: React.FC = () => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-8xl flex-col gap-[90px]">
      <header className="p-[38px]">
        <h2 className="text-light-blue">Shifumi !</h2>
      </header>

      <GameBoard />
    </div>
  );
};
