import React, { useEffect, useState } from 'react';

import { GameProgressBar } from '../../../ui/GameProgressBar';

type TimerProgressBarProps = {
  onTimerProgressBarEnds: () => void;
};

const TimerProgressBar: React.FC<TimerProgressBarProps> = ({
  onTimerProgressBarEnds,
}) => {
  const maxTime = 5; // 5 secondes au départ
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerProgressBarEnds();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0)); // Diminue d'une seconde
    }, 1000);

    return (): void => clearInterval(interval);
  }, [timeLeft, onTimerProgressBarEnds]);

  return (
    <div className="flex w-full items-center">
      {/* Utilisation de la GameProgressBar avec le pourcentage calculé */}
      <GameProgressBar timeLeft={timeLeft} maxTime={maxTime} />
    </div>
  );
};

export default TimerProgressBar;
