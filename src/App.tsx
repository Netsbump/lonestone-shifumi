import './assets/fonts/fonts.css';
import './assets/styles/variables.css';

import { GameProvider } from './features/game/GameContext';
import { Homepage } from './pages/Homepage';

export const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="bg-background text-white">
        <Homepage />
      </div>
    </GameProvider>
  );
};
