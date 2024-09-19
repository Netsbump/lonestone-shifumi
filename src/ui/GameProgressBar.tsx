import React from 'react';
import { Label, ProgressBar, ProgressBarProps } from 'react-aria-components';

type GameProgressBar = ProgressBarProps & {
  className?: string;
  timeLeft: number;
  maxTime: number;
};
export const GameProgressBar: React.FC<GameProgressBar> = ({
  timeLeft,
  maxTime,
  className,
}) => {
  const percentage = (timeLeft / maxTime) * 100;
  return (
    <ProgressBar
      value={timeLeft}
      className={`className="flex w-full ${className}`}
    >
      {() => (
        <>
          <div className="flex w-full flex-col items-center px-12">
            <Label>Prochain tour...</Label>
            <div className="top-[50%] mt-3 h-2 w-full translate-y-[-50%] transform rounded-full bg-gray-400 bg-opacity-40">
              <div
                className="linear absolute top-[50%] h-2 translate-y-[-50%] transform rounded-full bg-green transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span>{timeLeft} sec</span>
          </div>
        </>
      )}
    </ProgressBar>
  );
};
