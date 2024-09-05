import React from 'react';

type PlayerNameProps = {
  playerName: string;
  isComputer: boolean;
};

export const PlayerName: React.FC<PlayerNameProps> = ({
  playerName,
  isComputer,
}) => {
  return (
    <h3
      className={`flex ${isComputer ? 'flex-row-reverse' : ''} text-light-blue`}
    >
      {playerName}
    </h3>
  );
};
