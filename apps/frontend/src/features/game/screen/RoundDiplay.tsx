import type React from 'react';

import { TitleContainer } from '../../../ui/TitleContainer';
import { useGame } from '../useGame';

export const RoundDisplay: React.FC = () => {
  const { state } = useGame();
  const lastRound = state.roundStatus[state.roundStatus.length - 1];
  const currentRound = lastRound.roundNumber;

  return (
    <>
      {currentRound !== 0 && (
        <TitleContainer className="px-4">Manche {currentRound}</TitleContainer>
      )}
    </>
  );
};
