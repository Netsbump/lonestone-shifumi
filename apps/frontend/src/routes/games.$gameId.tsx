import { fetchGame } from '@/lib/api/game';
import { useCreateGameMutation } from '@/lib/hooks/useCreateGameMutation';
import { useCreateRoundMutation } from '@/lib/hooks/useCreateRoundMutation';
import { useFetchGameQuery } from '@/lib/hooks/useFetchGameQuery';
import { type Choice, FORFEIT, type GameDTO } from '@packages/dtos';
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
  async loader({ params }) {
    const gameId = Number(params.gameId);
    if (Number.isNaN(gameId)) {
      throw new Error('ID de jeu invalide');
    }
    const gameData = await fetchGame(gameId);
    return gameData;
  },
  component: Game,
});

function Game({ data: initialData }: { data: GameDTO }) {
  const { gameId } = Route.useParams();
  const navigate = Route.useNavigate();
  const isValidId = !Number.isNaN(Number(gameId));
  const { state, reset, start } = useGame();
  const gameStatus = state.gameStatus;
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);

  const { isLoading : isGameLoading, isFetching: isFetchingGame, isError, error } = useFetchGameQuery(Number(gameId), {
    initialData,
  })
  const { mutateAsync: createRoundMutation, isLoading: isCreateRound } = useCreateRoundMutation(Number(gameId));
  const { mutateAsync: resetNewGame, isError: isErrorResetGame, isLoading: isLoadingResetGame } = useCreateGameMutation()

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

  const handleSubmitReset = async() => {
      try {
  
        const gameData = await resetNewGame(state.players.player.name)

        reset(gameData.id)

        navigate({ to: `/games/${gameData.id}`, replace: true });
        
      } catch (error) {
        console.error('Unexpected error occurred during game creation', error);
      }
  }

  if (!isValidId) {
    return <div>ID de jeu invalide</div>;
  }

  if (isGameLoading) {
    return <div>Chargement de la partie...</div>
  }

  if (isError) {
    return <div>Erreur lors du chargement de la partie : {error.message}</div>
  }

  if (isErrorResetGame) {
    return <div>Erreur lors du lancement d'une nouvelle partie</div>
  }

  if (isLoadingResetGame) {
    return <div>Préparation de la nouvelle partie...</div>
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
          <GameButton onPress={handleSubmitReset} className={'flex w-72 items-center justify-center'}>
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
