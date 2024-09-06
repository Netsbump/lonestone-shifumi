import React from 'react';

import { TitleContainer } from '../../../ui/containers/TitleContainer';

type RoundDisplay = {
  round: number;
};
export const RoundDisplay: React.FC<RoundDisplay> = ({ round }) => {
  return <TitleContainer>Manche {round}</TitleContainer>;
};
