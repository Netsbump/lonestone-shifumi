import React from 'react';

import { GameHistory } from './gamehistory/components/GameHistory';
import { GameRules } from './gamerules/components/GameRules';
import { GameScreen } from './gamescreen/components/GameScreen';
import { PlayerScores } from './playerscores/components/PlayerScores';

export const GameBoard: React.FC = () => {
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
        <button className="rounded bg-blue-500 px-4 py-2 text-white">
          Commencer la partie
        </button>
      </div>
    </main>
  );
};
