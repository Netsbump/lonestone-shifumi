import React from 'react';

import { Round } from '../../../lib/types/global';
import { GameContainer } from '../../../ui/containers/GameContainer';
import { TitleContainer } from '../../../ui/containers/TitleContainer';

type GameHistoryProps = {
  roundsHistory?: Round[];
};

export const GameHistory: React.FC<GameHistoryProps> = ({ roundsHistory }) => {
  return (
    <GameContainer>
      <div className="flex h-full w-full flex-col gap-9 p-[10px]">
        <TitleContainer>Historique des coups</TitleContainer>

        {roundsHistory && roundsHistory.length > 0 ? (
          <ul>
            {roundsHistory.map((round, index) => (
              <li key={index}>
                {round.playerChoice} {round.roundResult} {round.opponentChoice}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </GameContainer>
  );
};
