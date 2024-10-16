import { OPPONENT, PLAYER, type Result, Status } from '@packages/dtos';

export const determineGameWinner = (roundResults: Result[], winThreshold = 5): Status => {
  const playerWins = roundResults.filter((result) => result === PLAYER).length;
  const opponentWins = roundResults.filter((result) => result === OPPONENT).length;

  return playerWins === winThreshold || opponentWins === winThreshold
    ? Status.FINISHED
    : Status.IN_PROGRESS;
};
