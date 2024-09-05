import React from 'react';

import { GameButton } from '../../ui/button/GameButton';
import { GameHistory } from './history/GameHistory';
import { GameRules } from './rules/GameRules';
import { PlayerScores } from './scores/PlayerScores';
import { GameScreen } from './screen/GameScreen';

export const GameBoard: React.FC = () => {
  const handlePress = (): void => {
    console.log('Button pressed');
  };

  return (
    <main className="grid grid-cols-5 grid-rows-[auto,minmax(420px,1fr),auto] gap-4">
      <div className="col-span-3 col-start-2 flex">
        <PlayerScores />
      </div>

      <div className="col-span-5 grid grid-cols-5 gap-5">
        <aside className="col-span-1">
          <GameRules />
        </aside>
        <div className="col-span-3">
          <GameScreen />
        </div>
        <aside className="col-span-1">
          <GameHistory />
        </aside>
      </div>

      <div className="col-span-3 col-start-2 flex items-center justify-center">
        <GameButton onPress={handlePress}>Commencer la partie</GameButton>
      </div>
    </main>
  );
};
