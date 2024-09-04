import React from 'react';

import { Round } from '../../../../../lib/types/global';
import { GameContainer } from '../../../../../ui/containers/GameContainer';

type GameHistoryProps = {
  roundsHistory?: Round[];
};

export const GameHistory: React.FC<GameHistoryProps> = ({ roundsHistory }) => {
  return (
    <GameContainer>
      <h5>Historique des coups</h5>

      {roundsHistory && roundsHistory.length > 0 ? (
        <ul>
          {roundsHistory.map((round, index) => (
            <li key={index}>
              {round.humanChoice} {round.result} {round.npcChoice}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun coup n&apos;a encore été joué</p>
      )}
    </GameContainer>
  );
};
