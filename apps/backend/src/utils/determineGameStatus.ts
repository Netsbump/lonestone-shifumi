import { type Result, Status } from '@packages/dtos';
import type { Round } from 'src/entities/round.entity';
import { determineGameWinner } from './determineGameWinner';
import { determineRoundResult } from './determineRoundResult';

// Fonction pour déterminer le statut en fonction du nombre de rounds joués
export function determineGameStatus(roundPlayed: number, rounds: Round[]): Status {
  if (roundPlayed < 1) {
    return Status.NOT_STARTED;
  }

  if (roundPlayed < 5) {
    return Status.IN_PROGRESS;
  }
  
  return calculateWinner(rounds);
}

// Fonction pour calculer le gagnant en fonction des résultats de rounds
function calculateWinner(rounds: Round[]): Status {
  const roundResults: Result[] = [];

  for (const round of rounds) {
    if (round.choices.length === 2) {
      roundResults.push(determineRoundResult(round.choices[0].action, round.choices[1].action));
    }
  }

  return determineGameWinner(roundResults);
}
