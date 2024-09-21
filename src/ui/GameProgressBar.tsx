import React from 'react';
import { Label, ProgressBar, ProgressBarProps } from 'react-aria-components';

type GameProgressBar = ProgressBarProps & {
  className?: string;
  duration: number;
};
export const GameProgressBar: React.FC<GameProgressBar> = ({
  duration,
  className,
}) => {
  return (
    <ProgressBar className={`className="flex w-full ${className}`}>
      {() => (
        <div className="flex w-full flex-col items-center">
          <div className="mb-1">
            <Label>Prochain round...</Label>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-400 bg-opacity-40">
            <div
              className="animate-progress-bar-right-to-left absolute right-0 top-0 h-full w-full bg-green"
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
