import { DRAW, LEAF, OPPONENT, PLAYER, type Result, SCISSORS, STONE } from '@packages/dtos';

export const determineRoundResult = (playerChoice: string, opponentChoice: string): Result => {
  if (playerChoice === opponentChoice) return DRAW;

  if (
    (playerChoice === STONE && opponentChoice === SCISSORS) ||
    (playerChoice === LEAF && opponentChoice === STONE) ||
    (playerChoice === SCISSORS && opponentChoice === LEAF)
  ) {
    return PLAYER;
  }
  return OPPONENT;
};
