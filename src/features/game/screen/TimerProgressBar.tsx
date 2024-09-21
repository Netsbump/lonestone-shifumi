import React, { useEffect } from 'react';

import { GameProgressBar } from '../../../ui/GameProgressBar';

type TimerProgressBarProps = {
  onTimerProgressBarEnds: () => void;
};

const TimerProgressBar: React.FC<TimerProgressBarProps> = ({
  onTimerProgressBarEnds,
}) => {
  const duration = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimerProgressBarEnds();
    }, duration * 1000);

    return (): void => clearTimeout(timer);
  }, [onTimerProgressBarEnds]);

  return (
    <div className="flex w-full items-center">
      <GameProgressBar duration={duration} />
    </div>
  );
};

export default TimerProgressBar;
