import React, { useEffect, useState } from 'react';

type TimerProps = {
  onTimerEnd: () => void;
};

export const Timer: React.FC<TimerProps> = ({ onTimerEnd }) => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (time <= 0) {
      onTimerEnd();
    }

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }),
    [time, onTimerEnd];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1>{time}</h1>
      <h4>Choisissez votre coup</h4>
    </div>
  );
};
