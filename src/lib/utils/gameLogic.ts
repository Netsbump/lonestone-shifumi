import { Choice, Result } from '../types/global';
import { DRAW, LEAF, OPPONENT, PLAYER, SCISSORS, STONE } from './constants';

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
    return PLAYER;
  } else {
    return OPPONENT;
  }
};

export const getRandomChoice = (): Choice => {
  const choices: Choice[] = [LEAF, STONE, SCISSORS];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

export const checkWinner = (
  scores: { player: number; opponent: number },
  winningScore: number = 5,
): boolean => {
  return scores.player >= winningScore || scores.opponent >= winningScore;
};