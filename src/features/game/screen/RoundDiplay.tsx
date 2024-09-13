import React from 'react';

import { TitleContainer } from '../../../ui/TitleContainer';
import { useGame } from '../useGame';

export const RoundDisplay: React.FC = () => {
  const { state } = useGame();
  const currentRound = state.currentRound;

  return (
    <>
      {currentRound !== 0 && (
        <TitleContainer className="px-4">Manche {currentRound}</TitleContainer>
      )}
    </>
  );
};
