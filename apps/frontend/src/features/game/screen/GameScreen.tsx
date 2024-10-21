import type React from 'react';
import { useMemo } from 'react';

import { FINISHED, FORFEIT, IN_PROGRESS } from '../../../lib/utils/constants';
import { getPlayerScores } from '../../../lib/utils/game.logic';
import { GameContainer } from '../../../ui/GameContainer';
import { useGame } from '../useGame';
import { EndGameDisplay } from './EndGameDisplay';
import { RoundDisplay } from './RoundDiplay';
import { RoundResultDisplay } from './RoundResultDisplay';
import { Timer } from './Timer';

export const GameScreen: React.FC = () => {
  const { state, play } = useGame();
  const { gameStatus, history, players } = state;

  const lastRoundStatus = history.length > 0 ? history[history.length - 1].timerRoundStatus : null;
  const isRoundTimerInProgress = lastRoundStatus === IN_PROGRESS;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const winnerGameName = useMemo(() => {
    const { playerScore } = getPlayerScores(history);

    if (playerScore === 5) {
      return players.player.name;
    }

    return players.opponent.name;

  }, [history]);

  const handleTimerEnd = (): void => {
    play(FORFEIT);
  };

  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center gap-9">
          {gameStatus === FINISHED ? (
            <EndGameDisplay winnerGameName={winnerGameName} />
          ) : isRoundTimerInProgress ? (
            <RoundResultDisplay />
          ) : (
            <Timer onTimerEnd={handleTimerEnd} />
          )}
        </div>
      </div>
    </GameContainer>
  );
};
