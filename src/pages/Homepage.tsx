import React, { useState } from 'react';

import { GameBoard } from '../features/game/GameBoard';
import { GameButton } from '../ui/button/GameButton';

export const Homepage: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handlePress = (): void => {
    setGameStarted((prev) => !prev);
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-8xl flex-col gap-[90px]">
      <header className="m-[38px]">
        <h2 className="text-light-blue">Shifumi !</h2>
      </header>

      <div>
        <GameBoard startGame={gameStarted} />

        {!gameStarted && (
          <footer className="flex items-center justify-center">
            <GameButton onPress={handlePress} name="start-button">
              Commencer la partie
            </GameButton>
          </footer>
        )}
      </div>
    </div>
  );
};
