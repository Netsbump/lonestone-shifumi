import { fetchGame } from '@/lib/api/game';
import { createRound } from '@/lib/api/round';
import type { Choice, GameDTO, RoundDTO } from '@packages/dtos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
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
  const { state, reset, start, update } = useGame();
  const gameStatus = state.gameStatus;
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false)
  

  const { isLoading : isGameLoading, isError, error } = useQuery<GameDTO, Error>(
    ['game', gameId],
    () => fetchGame(Number(gameId)),
    {
      staleTime: 1000 * 60 * 1,
      enabled: isValidId, 
      onSuccess: (gameData) => {
        update(gameData)
      },
      onSettled: () => {
        setIsProcessing(false);
      }
    }
  )

  // Mutation pour créer un nouveau round
  const { mutateAsync: createRoundMutation} = useMutation<
    RoundDTO,
    Error,
    { gameId: number; player: { name: string; action: Choice } }
  >(
    ({ gameId, player }) => createRound({ gameId, player }), // Fonction de mutation
    {
      mutationKey: ['createRound'], 
      onMutate: () => {
        setIsProcessing(true);
      },
      onSuccess: () => {
        // Après avoir créé un round, fetch les données du jeu pour avoir la dernière version
        queryClient.invalidateQueries(['game', gameId]);
        // Maj de toutes les games de la page d'acceuil
        queryClient.invalidateQueries(['games']);
      },
    }
  );

  const handlePlayerChoice = async (playerChoice: Choice) => {
    try {
      // Appel à la mutation pour créer un nouveau round
      await createRoundMutation({
        gameId: Number(gameId), 
        player: {
          name: state.players.player.name,
          action: playerChoice,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création du round:', error);
    }
  };

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
          <GameScreen isProcessing={isProcessing}/>
        </div>
        <aside className="col-span-1">
          <GameHistory />
        </aside>
      </div>

      {gameStatus === IN_PROGRESS && (
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButtonGroup onPlayerChoice={handlePlayerChoice} isProcessing={isProcessing} />
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
