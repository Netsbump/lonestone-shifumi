import { Game } from './features/game/Game';
import { useGame } from './features/game/useGame';
import { NOT_STARTED } from './lib/utils/constants';
import { GameButton } from './ui/GameButton';

export const App: React.FC = () => {
  const { state, start } = useGame();
  const gameStatus = state.gameStatus;
  const handleStartGame = (): void => {
    start();
  };

  return (
    <div className="text-white">
      <div className="mx-auto flex h-screen w-full max-w-8xl flex-col">
        <header className="m-9">
          <h2 className="text-light-blue">Shifumi !</h2>
        </header>

        <Game />

        {gameStatus === NOT_STARTED && (
          <footer className="mt-5 flex items-center justify-center">
            <GameButton
              onPress={handleStartGame}
              className={'flex w-72 items-center justify-center'}
            >
              Commencer la partie
            </GameButton>
          </footer>
        )}
      </div>
    </div>
  );
};
