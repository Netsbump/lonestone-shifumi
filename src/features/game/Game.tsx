import React from 'react';

import { Choice } from '../../lib/types/game.types';
import { FINISHED, IN_PROGRESS } from '../../lib/utils/constants';
import { GameButton } from '../../ui/GameButton';
import { GameButtonGroup } from './GameButtonGroup';
import { GameHistory } from './history/GameHistory';
import { GameRules } from './rules/GameRules';
import { PlayerScores } from './scores/PlayerScores';
import { GameScreen } from './screen/GameScreen';
import TimerProgressBar from './screen/TimerProgressBar';
import { useGame } from './useGame';

export const Game: React.FC = () => {
  const { state, play, reset, nextRound } = useGame();
  const gameStatus = state.gameStatus;
  const roundStatus = state.roundStatus;

  const handlePlayerChoice = (playerChoice: Choice): void => {
    play(playerChoice);
  };

  const handleResetGame = (): void => {
    reset();
  };

  const handleProgressComplete = (): void => {
    nextRound();
  };

  const lastRoundStatus = roundStatus[roundStatus.length - 1];
  const showProgressBar =
    lastRoundStatus?.timerProgressBarStatus === IN_PROGRESS;

  return (
    <main className="grid grid-cols-5 grid-rows-[auto,minmax(420px,1fr),auto]">
      <div className="col-span-3 col-start-2 mb-3 flex">
        <PlayerScores />
      </div>

      <div className="col-span-5 grid grid-cols-5 gap-5">
        <aside className="col-span-1">
          <GameRules />
        </aside>
        <div className="col-span-3">
          <GameScreen />
        </div>
        <aside className="col-span-1">
          <GameHistory />
        </aside>
      </div>

      {gameStatus === IN_PROGRESS && (
        <div className="col-span-3 col-start-2">
          {showProgressBar && (
            <div className="flex w-full items-center px-[24px] pb-3 pt-1">
              <TimerProgressBar
                onTimerProgressBarEnds={handleProgressComplete}
              />
            </div>
          )}
          <div className="mt-5">
            <GameButtonGroup onPlayerChoice={handlePlayerChoice} />
          </div>
        </div>
      )}

      {gameStatus === FINISHED && (
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButton
            onPress={handleResetGame}
            className={'flex w-72 items-center justify-center'}
          >
            Rejouez
          </GameButton>
        </div>
      )}
    </main>
  );
};
