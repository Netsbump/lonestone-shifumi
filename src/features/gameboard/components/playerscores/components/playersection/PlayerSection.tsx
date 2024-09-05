import React from 'react';

import { LiveScore } from './LiveScore';
import { PlayerName } from './PlayerName';

type PlayerSectionProps = {
  avatar: string;
  altAvatar: string;
  playerName: string;
  scores: number;
  isComputer: boolean;
};

export const PlayerSection: React.FC<PlayerSectionProps> = ({
  avatar,
  altAvatar,
  playerName,
  scores,
  isComputer,
}) => {
  return (
    <div
      className={`flex ${isComputer ? 'flex-row-reverse' : 'flex-row'} gap-4`}
    >
      <img src={avatar} alt={altAvatar} width="60px" height="60px" />
      <div className="flex flex-col gap-1">
        <PlayerName playerName={playerName} isComputer={isComputer} />
        <LiveScore scores={scores} isComputer={isComputer} />
      </div>
    </div>
  );
};
