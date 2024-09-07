import React from 'react';

import { TitleContainer } from '../../../ui/containers/TitleContainer';
import { useGame } from '../useGame';

export const RoundDisplay: React.FC = () => {
  const { state } = useGame();

  return (
    <>
      {state.round !== 0 && (
        <TitleContainer className="px-4">Manche {state.round}</TitleContainer>
      )}
    </>
  );
};
