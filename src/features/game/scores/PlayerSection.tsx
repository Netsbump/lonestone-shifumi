import React from 'react';

import { LiveScore } from './LiveScore';
import { PlayerName } from './PlayerName';

type PlayerSectionProps = {
  avatar: string;
  altAvatar: string;
  playerName: string;
  scores: number;
  isOpponent: boolean;
};

export const PlayerSection: React.FC<PlayerSectionProps> = ({
  avatar,
  altAvatar,
  playerName,
  scores,
  isOpponent,
}) => {
  return (
    <div
      className={`flex ${isOpponent ? 'flex-row-reverse' : 'flex-row'} gap-4`}
    >
      <div>
        <img src={avatar} alt={altAvatar} className="w-15 h-15" />
      </div>
      <div className="flex flex-col gap-1">
        <PlayerName playerName={playerName} isOpponent={isOpponent} />
        <LiveScore scores={scores} isOpponent={isOpponent} />
      </div>
    </div>
  );
};
