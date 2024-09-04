import React from 'react';

import { LiveScore } from './LiveScore';

type PlayerSectionProps = {
  avatar: string;
  altAvatar: string;
  playerName: string;
  scores: number;
};

export const PlayerSection: React.FC<PlayerSectionProps> = ({
  avatar,
  altAvatar,
  playerName,
  scores,
}) => {
  return (
    <div className="flex">
      <img src={avatar} alt={altAvatar} width="60px" height="60px" />
      <div className="flex-col">
        <p className="text-light-blue">{playerName}</p>
        <LiveScore scores={scores} />
      </div>
    </div>
  );
};
