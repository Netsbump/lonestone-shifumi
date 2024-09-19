import React, { useEffect, useState } from 'react';

import { IN_PROGRESS } from '../../../lib/utils/constants';
import { useGame } from '../useGame';

type TimerProps = {
  onTimerEnd: () => void;
};

export const Timer: React.FC<TimerProps> = ({ onTimerEnd }) => {
  const { state } = useGame();
  const gameStatus = state.gameStatus;
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (gameStatus !== IN_PROGRESS) return;

    if (time <= 0) {
      onTimerEnd();
      return;
    }

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return (): void => clearInterval(timerInterval);
  }, [onTimerEnd, gameStatus, time]);

  return (
    <>
      {gameStatus === IN_PROGRESS ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1>{time}</h1>
          <h4>Choisissez votre coup</h4>
        </div>
      ) : null}
    </>
  );
};
