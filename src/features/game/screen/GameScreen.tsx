import React from 'react';

import { GameContainer } from '../../../ui/containers/GameContainer';
import { RoundDisplay } from './RoundDiplay';

type GameScreen = {
  round: number;
};

export const GameScreen: React.FC<GameScreen> = ({ round }) => {
  return (
    <GameContainer>
      <RoundDisplay round={round} />
    </GameContainer>
  );
};
