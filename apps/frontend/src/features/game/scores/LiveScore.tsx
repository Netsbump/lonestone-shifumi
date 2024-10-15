import type React from 'react';

type LiveScoreProps = {
  scores: number;
  isOpponent: boolean;
};

const dotBlack = '/images/dot-black.svg';
const dotGreen =  '/images/dot-green.svg';

export const LiveScore: React.FC<LiveScoreProps> = ({ scores, isOpponent }) => {
  const dots = Array(5)
    .fill(null)
    .map((_, index) => {
      return (
        <img
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          src={index < scores ? dotGreen : dotBlack}
          alt={index < scores ? 'green dot' : 'black dot'}
          width="20px"
          height="20px"
        />
      );
    });
  return <div className={`flex ${isOpponent ? 'flex-row-reverse' : ''} gap-1`}>{dots}</div>;
};
