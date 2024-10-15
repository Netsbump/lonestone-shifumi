import type React from 'react';

type EndGameDisplayProps = {
  winnerGameName: string;
};

export const EndGameDisplay: React.FC<EndGameDisplayProps> = ({ winnerGameName }) => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-9">
      <h2 className="w-full justify-center text-light-blue">
        Fin de la partie
        <br />
        {winnerGameName === 'Moi' ? 'Vous avez' : `${winnerGameName} a`} gagné
      </h2>
    </div>
  );
};
