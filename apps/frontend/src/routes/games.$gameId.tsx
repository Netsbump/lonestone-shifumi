import { useCreateRoundMutation } from '@/lib/hooks/useCreateRoundMutation';
import { useFetchGameQuery } from '@/lib/hooks/useFetchGameQuery';
import { type Choice, FORFEIT } from '@packages/dtos';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { GameButtonGroup } from '../features/game/GameButtonGroup';
import { GameHistory } from '../features/game/history/GameHistory';
import { GameRules } from '../features/game/rules/GameRules';
import { PlayerScores } from '../features/game/scores/PlayerScores';
import { GameScreen } from '../features/game/screen/GameScreen';
import { useGame } from '../features/game/useGame';
import { FINISHED, IN_PROGRESS, NOT_STARTED } from '../lib/utils/constants';
import { GameButton } from '../ui/GameButton';

export const Route = createFileRoute('/games/$gameId')({
  component: Game,
});

function Game() {
  const { gameId } = Route.useParams();
  const isValidId = !Number.isNaN(Number(gameId));
  const { state, reset, start } = useGame();
  const gameStatus = state.gameStatus;
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);

  const { isLoading : isGameLoading, isFetching: isFetchingGame, isError, error } = useFetchGameQuery(Number(gameId))
  const { mutateAsync: createRoundMutation, isLoading: isCreateRound } = useCreateRoundMutation(Number(gameId));
  //   const isPlayerChoice = !!playerChoice;
    
  //   let playerRoundChoice = playerChoice;

  //   if(!isPlayerChoice) {
  //     playerRoundChoice = FORFEIT
  //   }

  //   try {
  //     // Appel à la mutation pour créer un nouveau round
  //     await createRoundMutation({ 
  //       player: {
  //         name: state.players.player.name,
  //         action: playerRoundChoice as Choice,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Erreur lors de la création du round:', error);
  //   }
  // };

  const isProcessing = isFetchingGame || isCreateRound;

const handlePlayerChoice = useCallback(async () => {
  const playerRoundChoice = playerChoice || FORFEIT;

    try {
      // Appel à la mutation pour créer un nouveau round
      await createRoundMutation({
        player: {
          name: state.players.player.name,
          action: playerRoundChoice as Choice,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création du round:', error);
    }
    finally {
      setPlayerChoice(null);
    }
  }, [playerChoice, createRoundMutation, state.players.player.name]);

  const handleSetPlayerChoice = useCallback((choice: Choice) => {
    setPlayerChoice(choice);
  }, []);

  if (!isValidId) {
    return <div>ID de jeu invalide</div>;
  }

  if (isGameLoading) {
    return <div>Chargement de la partie...</div>
  }

  if (isError) {
    return <div>Erreur lors du chargement de la partie : {error.message}</div>
  }

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
          <GameScreen isProcessing={isProcessing} onTimerEnd={handlePlayerChoice}/>
        </div>
        <aside className="col-span-1">
          <GameHistory />
        </aside>
      </div>

      {gameStatus === IN_PROGRESS && (
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButtonGroup onPlayerChoice={handleSetPlayerChoice} isProcessing={isProcessing} />
        </div>
      )}

      {gameStatus === FINISHED && (
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButton onPress={reset} className={'flex w-72 items-center justify-center'}>
            Rejouez
          </GameButton>
        </div>
      )}

      {gameStatus === NOT_STARTED && (
        <footer className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButton onPress={start} className={'flex w-72 items-center justify-center'}>
            Commencer la partie
          </GameButton>
        </footer>
      )}
    </main>
  );
}
