import { TableGames } from '@/ui/TableGames';
import type { GameDTO } from '@packages/dtos';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { fetchGames } from '../lib/api/game';
import { GameButton } from '../ui/GameButton';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: games, isLoading, isError, error } = useQuery<GameDTO[], Error>(
    ['games'],
    fetchGames,
    {
      staleTime: 1000 * 60 * 1, // Les données sont fraîches pendant 1 minute
    }
  );

  if (isLoading) {
    return <div className='h-full w-full m-auto py-3 text-center'>Chargement des parties en cours...</div>;
  }

  if (isError) {
    return <div className='h-full w-full m-auto py-3 text-center'>Erreur : {error.message}</div>;
  }

  return (
    <div className="h-full flex flex-col justify-between py-3">
      {games.length > 0 && (
        <main className="flex flex-col">
          <h3>Choisissez une partie existante</h3>
          <ul className="flex justify-center gap-3 pt-6 flex-wrap">
          <TableGames games={games}/>
          </ul>
        </main>
      )}

      <footer className="mt-5 flex items-center justify-center">
        <GameButton
          className={'flex w-72 items-center justify-center'}
        >
          <Link to="/game/new">
          Nouvelle partie
          </Link>
        </GameButton>
      </footer>
    </div>
  );
}
