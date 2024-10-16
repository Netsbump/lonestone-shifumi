import type { GameDTO } from '@packages/dtos';
import { useEffect, useState } from 'react';
import { fetchGames } from '../../lib/api/game';
import { GameButton } from '../../ui/GameButton';

export const Home = () => {
  const [games, setGames] = useState<GameDTO[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchGames();
      console.log(response);
      setGames(response);
    };
    fetch();
  }, []);

  const handleStartGame = (gameId: number | null = null): void => {
    if (gameId) {
      // Rejoindre une partie existante
      console.log(`Rejoindre la partie avec ID ${gameId}`);
      // Logique pour démarrer une partie existante
    } else {
      // Commencer une nouvelle partie
      console.log('Commencer une nouvelle partie');
      // Logique pour démarrer une nouvelle partie
    }
  };

  return (
    <div className="h-full flex flex-col justify-between py-3">
      {games.length > 0 && (
        <main className="flex flex-col">

          <h2>Choisissez une partie existante</h2>
          <ul className="flex justify-center gap-3 pt-6 flex-wrap" >
            {games.map((game) => (
              <li key={game.id} className='col-span-3'>
                <GameButton className="flex flex-col" onPress={() => handleStartGame(game.id)}>
                  <span> Game {game.id}</span>
                  <span>Statut: {game.status}</span>
                  <span>Rounds joués: {game.roundPlayed}</span>
                </GameButton>
              </li>
            ))}
          </ul>
        </main>
      )}

      <footer className="mt-5 flex items-center justify-center">
        <GameButton
          onPress={() => handleStartGame}
          className={'flex w-72 items-center justify-center'}
        >
          Commencer une nouvelle partie
        </GameButton>
      </footer>
    </div>
  );
};
