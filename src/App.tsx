import './assets/fonts/fonts.css';
import './assets/styles/variables.css';

import { Homepage } from './pages/Homepage';

export const App: React.FC = () => {
  return (
    <div className="bg-background text-white">
      <Homepage />
    </div>
  );
};
