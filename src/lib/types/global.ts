import {
  DRAW,
  LEAF,
  OPPONENT,
  PLAYER,
  SCISSORS,
  STONE,
} from '../utils/constants';

export type Result = typeof PLAYER | typeof OPPONENT | typeof DRAW;

export type Round = {
  playerChoice: Choice;
  opponentChoice: Choice;
  roundResult: Result;
};

export type Choice = typeof LEAF | typeof STONE | typeof SCISSORS;
