import { Button } from '@/components/ui/button';
import type { GameDTO } from '@packages/dtos';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { fetchGames } from '../lib/api/game';
import { GameButton } from '../ui/GameButton';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const navigate = Route.useNavigate();
  const [games, setGames] = useState<GameDTO[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchGames();
      console.log(response);
      setGames(response);
    };
    fetch();
  }, []);

  const handleStartGame = (gameId: number) => {
    console.log(`Rejoindre la partie avec ID ${gameId}`);
    navigate({ to: `/games/${gameId}` });
  };

  const handleStartNewGame = () => {
    // Commencer une nouvelle partie
    console.log('Commencer une nouvelle partie');
    navigate({ to: '/game/new' });
  };

  return (
    <div className="h-full flex flex-col justify-between py-3">
      {games.length > 0 && (
        <main className="flex flex-col">
          <h3>Choisissez une partie existante</h3>
          <ul className="flex justify-center gap-3 pt-6 flex-wrap">
            {games.map((game) => (
              <li key={game.id} className="col-span-3">
                <Button className="flex flex-col w-40 h-30 bg-night-blue" onClick={() => handleStartGame(game.id)}>
                  <span> Game {game.id}</span>
                  <span>Statut: {game.status}</span>
                  <span>Rounds joués: {game.roundPlayed}</span>
                </Button>
              </li>
            ))}
          </ul>
        </main>
      )}

      <footer className="mt-5 flex items-center justify-center">
        <GameButton
          onPress={handleStartNewGame}
          className={'flex w-72 items-center justify-center'}
        >
          Nouvelle partie
        </GameButton>
      </footer>
    </div>
  );
}
