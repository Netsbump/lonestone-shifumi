import React from 'react';

import { PlayerSection } from './PlayerSection';

export const PlayerScores: React.FC = () => {
  return (
    <div className="flex w-full justify-between">
      <PlayerSection />
      <PlayerSection isOpponent />
    </div>
  );
};
