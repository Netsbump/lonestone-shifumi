import React, { useMemo } from 'react';

import { FINISHED } from '../../../lib/utils/constants';
import { getPlayerScores } from '../../../lib/utils/game.logic';
import { GameContainer } from '../../../ui/containers/GameContainer';
import { useGame } from '../useGame';
import { RoundDisplay } from './RoundDiplay';

export const GameScreen: React.FC = () => {
  const { state } = useGame();
  const { gameStatus, history, players } = state;
  const lastRound = state.history[state.history.length - 1];

  const winnerName = useMemo(() => {
    const { playerScore, opponentScore } = getPlayerScores(history);

    if (playerScore === 5) {
      return players.player.name;
    } else if (opponentScore === 5) {
      return players.opponent.name;
    }

    return null; // Pas encore de gagnant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const playerChoice = lastRound?.playerChoice;
  const opponentChoice = lastRound?.opponentChoice;
  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center gap-9">
          {gameStatus === FINISHED ? (
            <div className="flex h-full w-full items-center justify-center gap-9">
              <div>
                Fin de la partie,{' '}
                {winnerName === 'Moi' ? 'Vous avez' : `${winnerName} a`} gagné
              </div>
            </div>
          ) : (
            <>
              {!playerChoice && <div>Jouez !</div>}
              {playerChoice && <div>Player: {playerChoice}</div>}
              {opponentChoice && <div>Opponent: {opponentChoice}</div>}
            </>
          )}
        </div>
      </div>
    </GameContainer>
  );
};
