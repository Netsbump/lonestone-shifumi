import React, { useEffect, useMemo, useState } from 'react';

import { FINISHED, FORFEIT } from '../../../lib/utils/constants';
import { getPlayerScores } from '../../../lib/utils/game.logic';
import { GameContainer } from '../../../ui/GameContainer';
import { useGame } from '../useGame';
import { EndGameDisplay } from './EndGameDisplay';
import { RoundDisplay } from './RoundDiplay';
import { RoundResultDisplay } from './RoundResultDisplay';
import { Timer } from './Timer';

export const GameScreen: React.FC = () => {
  const { state, play, nextRound } = useGame();
  const { gameStatus, history, players } = state;
  const lastRound = state.history[state.history.length - 1];
  const [showRoundChoices, setShowRoundChoices] = useState(false);
  const [hasPlayerMadeChoice, setHasPlayerMadeChoice] = useState(false);

  const winnerGameName = useMemo(() => {
    const { playerScore } = getPlayerScores(history);

    if (playerScore === 5) {
      return players.player.name;
    }

    return players.opponent.name;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  // Détecte quand le joueur fait un choix
  useEffect(() => {
    if (lastRound) {
      setHasPlayerMadeChoice(true); // Le joueur a fait un choix, donc on arrête le Timer
      setShowRoundChoices(true); // On affiche le résultat du round
    }
  }, [lastRound]);

  // Fonction appelée lorsque le Timer atteint zéro (Forfait si pas de choix)
  const handleTimerEnd = (): void => {
    if (!hasPlayerMadeChoice) {
      play(FORFEIT); // Déclenche un forfait seulement si aucun choix n'a été fait
      setShowRoundChoices(true); // Affiche les résultats même en cas de forfait
    }
  };

  // Fonction appelée lorsque la ProgressBar atteint la fin (après 5 secondes)
  const handleProgressComplete = (): void => {
    nextRound();
    setShowRoundChoices(false); // Cache le RoundChoices et réaffiche le Timer
    setHasPlayerMadeChoice(false); // Reset l'état pour le prochain tour
  };

  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center gap-9">
          {gameStatus === FINISHED ? (
            <EndGameDisplay winnerGameName={winnerGameName} />
          ) : showRoundChoices ? (
            <RoundResultDisplay
              onProgressComplete={handleProgressComplete} // Relance le Timer à la fin des 5 secondes
            />
          ) : (
            <Timer onTimerEnd={handleTimerEnd} />
          )}
        </div>
      </div>
    </GameContainer>
  );
};
