import type { Choice } from '@packages/dtos';
import { createFileRoute } from '@tanstack/react-router';
import { GameButtonGroup } from '../features/game/GameButtonGroup';
import { GameHistory } from '../features/game/history/GameHistory';
import { GameRules } from '../features/game/rules/GameRules';
import { PlayerScores } from '../features/game/scores/PlayerScores';
import { GameScreen } from '../features/game/screen/GameScreen';
import { useGame } from '../features/game/useGame';
import { FINISHED, IN_PROGRESS } from '../lib/utils/constants';
import { GameButton } from '../ui/GameButton';

export const Route = createFileRoute('/games/$gameId')({
  component: Game,
})

//Todo doit s'attendre à récup un gameID
function Game() {
  const { state, play, reset } = useGame();
  const gameStatus = state.gameStatus;

  const handlePlayerChoice = (playerChoice: Choice): void => {
    play(playerChoice);
  };

  const handleResetGame = (): void => {
    reset();
  };

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
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButtonGroup onPlayerChoice={handlePlayerChoice} />
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
}
