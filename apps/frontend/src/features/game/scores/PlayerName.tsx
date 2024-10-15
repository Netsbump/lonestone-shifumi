import type React from 'react';

type PlayerNameProps = {
  playerName: string;
  isOpponent: boolean;
};

export const PlayerName: React.FC<PlayerNameProps> = ({ playerName, isOpponent }) => {
  return (
    <h3 className={`flex ${isOpponent ? 'flex-row-reverse' : ''} text-light-blue`}>{playerName}</h3>
  );
};
