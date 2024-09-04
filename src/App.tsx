import './assets/fonts/fonts.css';

import { Homepage } from './pages/Homepage';

export const App: React.FC = () => {
  return (
    <div className="bg-dark-blue text-white">
      <Homepage />
    </div>
  );
};
