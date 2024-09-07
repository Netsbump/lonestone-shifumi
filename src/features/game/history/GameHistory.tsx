import React from 'react';

import { GameContainer } from '../../../ui/containers/GameContainer';
import { TitleContainer } from '../../../ui/containers/TitleContainer';
import { useGame } from '../useGame';

export const GameHistory: React.FC = () => {
  const { state } = useGame();

  return (
    <GameContainer>
      <div className="p-container flex h-full w-full flex-col gap-9">
        <TitleContainer>Historique des coups</TitleContainer>

        {state.history && state.history.length > 0 ? (
          <ul>
            {state.history.map((round, index) => (
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
