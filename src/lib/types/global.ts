import { DRAW, LEAF, LOSE, SCISSORS, STONE, WIN } from '../utils/constants';

export type Result = typeof WIN | typeof LOSE | typeof DRAW;

export type Round = {
  humanChoice: Choice;
  npcChoice: Choice;
  result: Result;
};

export type Choice = typeof LEAF | typeof STONE | typeof SCISSORS;
