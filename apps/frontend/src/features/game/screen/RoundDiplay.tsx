import type React from 'react';

import { TitleContainer } from '../../../ui/TitleContainer';
import { useGame } from '../useGame';

export const RoundDisplay: React.FC = () => {
  const { state } = useGame();
  const { history } = state;
  //const lastRound = state.roundStatus[state.roundStatus.length - 1];
  const lastRound = history.length > 0 ? history[history.length - 1].number : 0;
  const currentRound = lastRound;

  return (
    <>
      {currentRound !== 0 && (
        <TitleContainer className="px-4">Manche {currentRound}</TitleContainer>
      )}
    </>
  );
};
