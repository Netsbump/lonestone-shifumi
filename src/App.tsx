import { useState } from 'react';

import './assets/fonts/fonts.css';
import './assets/styles/variables.css';

import { Game } from './features/game/Game';
import { GameProvider } from './features/game/GameContext';
import { GameButton } from './ui/button/GameButton';

export const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handlePress = (): void => {
    setGameStarted((prev) => !prev);
  };

  return (
    <GameProvider>
      <div className="bg-background text-white">
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
      </div>
    </GameProvider>
  );

  // return (
  //   <GameProvider>
  //     <div className="bg-background text-white">
  //       <Homepage />
  //     </div>
  //   </GameProvider>
  // );
};
