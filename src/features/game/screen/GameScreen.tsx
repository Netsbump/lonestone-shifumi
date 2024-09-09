import React from 'react';

import { GameContainer } from '../../../ui/containers/GameContainer';
import { useGame } from '../useGame';
import { RoundDisplay } from './RoundDiplay';

export const GameScreen: React.FC = () => {
  const { state } = useGame();
  const lastRound = state.history[state.history.length - 1];

  // Savoir si quelqu'un à gagné et qui
  const endGame = state.scores.player === 5 || state.scores.opponent === 5;

  // Déterminer le gagnant
  const winner =
    state.scores.player === 5
      ? 'Player'
      : state.scores.opponent === 5
        ? 'Opponent'
        : null;

  const playerChoice = lastRound?.playerChoice;
  const opponentChoice = lastRound?.opponentChoice;
  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center gap-9">
          {endGame ? (
            <div className="flex h-full w-full items-center justify-center gap-9">
              <div>Fin de la partie, {winner} a gagné</div>
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
