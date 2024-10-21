import { Button } from '@/components/ui/button';
import type { GameDTO } from '@packages/dtos';
import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchGames } from '../lib/api/game';
import { GameButton } from '../ui/GameButton';

export const Route = createFileRoute('/')({
  loader: async () => {
    const games = await fetchGames();
    return { games };
  },
  component: Index,
});

function Index() {
  const { games } = Route.useLoaderData() as { games: GameDTO[] };

  return (
    <div className="h-full flex flex-col justify-between py-3">
      {games.length > 0 && (
        <main className="flex flex-col">
          <h3>Choisissez une partie existante</h3>
          <ul className="flex justify-center gap-3 pt-6 flex-wrap">
            {games.map((game) => (
              <li key={game.id} className="col-span-3">
                <Button className="flex flex-col w-40 h-30 bg-night-blue" asChild>
                  <Link to={`/games/${game.id}`}>
                  <span> Game {game.id}</span>
                  <span>Statut: {game.status}</span>
                  <span>Rounds joués: {game.roundPlayed}</span>
                  </Link>
                </Button>
              </li>
            ))}
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
