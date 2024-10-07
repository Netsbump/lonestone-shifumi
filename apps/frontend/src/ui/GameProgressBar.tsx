import React from 'react';
import { Label, ProgressBar, ProgressBarProps } from 'react-aria-components';

type GameProgressBar = ProgressBarProps & {
  className?: string;
  duration: number;
};
export const GameProgressBar: React.FC<GameProgressBar> = ({ duration, className }) => {
  return (
    <ProgressBar className={`flex w-full justify-center ${className}`}>
      {() => (
        <div className="flex w-[80%] flex-col items-center">
          <div className="mb-1">
            <Label>Prochain round...</Label>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-400 bg-opacity-40">
            <div
              className="absolute right-0 top-0 h-full w-full animate-progress-bar-right-to-left bg-green"
              style={
                {
                  ['--duration' as string]: `${duration}s`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      )}
    </ProgressBar>
  );
};
