import React, { useState } from 'react';

import { Game } from '../features/game/Game';
import { useGame } from '../features/game/useGame';
import { GameButton } from '../ui/button/GameButton';

export const Homepage: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const { dispatch } = useGame();
  const handlePress = (): void => {
    setGameStarted((prev) => !prev);
    // setGameStarted(false);
    dispatch({ type: 'INCREMENT_ROUND', value: 1 });
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-8xl flex-col">
      <header className="m-9">
        <h2 className="text-light-blue">Shifumi !</h2>
      </header>

      <Game startGame={gameStarted} />

      {!gameStarted && (
        <footer className="mt-5 flex items-center justify-center">
          <GameButton
            onPress={handlePress}
            className={'flex w-72 items-center justify-center'}
          >
            Commencer la partie
          </GameButton>
        </footer>
      )}
    </div>
  );
};
