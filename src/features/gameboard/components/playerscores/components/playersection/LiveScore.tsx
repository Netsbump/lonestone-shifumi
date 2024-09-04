import React from 'react';

import dotBlack from '../../../../../../assets/images/dot-black.svg';
import dotGreen from '../../../../../../assets/images/dot-green.svg';

type LiveScoreProps = {
  scores: number;
};

export const LiveScore: React.FC<LiveScoreProps> = ({ scores }) => {
  const dots = Array(5)
    .fill(null)
    .map((_, index) => {
      return (
        <img
          key={index}
          src={index < scores ? dotGreen : dotBlack}
          alt={index < scores ? 'green dot' : 'black dot'}
        />
      );
    });
  return <div className="flex">{dots}</div>;
};
