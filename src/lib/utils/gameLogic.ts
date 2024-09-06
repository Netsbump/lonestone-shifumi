import { Choice, Result } from '../types/global';
import { DRAW, LEAF, LOSE, SCISSORS, STONE, WIN } from './constants';

export const determineRoundResult = (
  playerChoice: string,
  opponentChoice: string,
): Result => {
  if (playerChoice === opponentChoice) return DRAW;

  if (
    (playerChoice === STONE && opponentChoice === SCISSORS) ||
    (playerChoice === LEAF && opponentChoice === STONE) ||
    (playerChoice === SCISSORS && opponentChoice === LEAF)
  ) {
    return WIN;
  } else {
    return LOSE;
  }
};

export const getRandomChoice = (): Choice => {
  const choices: Choice[] = [LEAF, STONE, SCISSORS];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};
