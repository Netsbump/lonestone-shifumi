import React from 'react';

import humanPlayer from '../../../assets/images/avatar-human.svg';
import npcPlayer from '../../../assets/images/avatar-robot.svg';
import { PlayerSection } from './PlayerSection';

export const PlayerScores: React.FC = () => {
  return (
    <div className="flex w-full justify-between">
      <PlayerSection
        playerName="Moi"
        avatar={humanPlayer}
        altAvatar="avatar human player"
        scores={0}
        isOpponent={false}
      />
      <PlayerSection
        playerName="J-Ordi"
        avatar={npcPlayer}
        altAvatar="avatar npc player"
        scores={0}
        isOpponent
      />
    </div>
  );
};
