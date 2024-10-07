import {
  Choice,
  Result,
  Round,
  Rules,
  VisualElements,
} from '../types/game.types';
import {
  DRAW,
  LEAF,
  OPPONENT,
  PLAYER,
  SCISSORS,
  SHIFUMI_RULES,
  STONE,
  VISUAL_ELEMENTS,
} from './constants';

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

export const getPlayerScores = (
  history: Round[],
): { playerScore: number; opponentScore: number } => {
  const playerScore = history.filter(
    (round) => round.roundResult === PLAYER,
  ).length;
  const opponentScore = history.filter(
    (round) => round.roundResult === OPPONENT,
  ).length;

  return {
    playerScore,
    opponentScore,
  };
};

export const getRuleInfo = (
  choice: Choice,
): Rules[Choice] & VisualElements[Choice] => {
  const rule = SHIFUMI_RULES[choice];
  const visual = VISUAL_ELEMENTS[choice];

  return {
    ...rule,
    ...visual,
  };
};
