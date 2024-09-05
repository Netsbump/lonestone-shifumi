import React from 'react';

import dotBlack from '../../../../../../assets/images/dot-black.svg';
import dotGreen from '../../../../../../assets/images/dot-green.svg';

type LiveScoreProps = {
  scores: number;
  isComputer: boolean;
};

export const LiveScore: React.FC<LiveScoreProps> = ({ scores, isComputer }) => {
  const dots = Array(5)
    .fill(null)
    .map((_, index) => {
      return (
        <img
          key={index}
          src={index < scores ? dotGreen : dotBlack}
          alt={index < scores ? 'green dot' : 'black dot'}
          width="20px"
          height="20px"
        />
      );
    });
  return (
    <div className={`flex ${isComputer ? 'flex-row-reverse' : ''} gap-1`}>
      {dots}
    </div>
  );
};
