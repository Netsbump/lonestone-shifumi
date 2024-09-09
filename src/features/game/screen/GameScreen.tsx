import React from 'react';

import { FINISHED } from '../../../lib/utils/constants';
import { GameContainer } from '../../../ui/containers/GameContainer';
import { useGame } from '../useGame';
import { RoundDisplay } from './RoundDiplay';

export const GameScreen: React.FC = () => {
  const { state } = useGame();
  const lastRound = state.history[state.history.length - 1];
  // Déterminer fin de game via gameStatus
  const gameStatus = state.gameStatus;

  // Déterminer le gagnant via l'historique

  const playerChoice = lastRound?.playerChoice;
  const opponentChoice = lastRound?.opponentChoice;
  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center gap-9">
          {gameStatus === FINISHED ? (
            <div className="flex h-full w-full items-center justify-center gap-9">
              <div>Fin de la partie, truc a gagné</div>
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
