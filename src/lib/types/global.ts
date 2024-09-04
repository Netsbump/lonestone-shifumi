import { DRAW, LOSE, WIN } from '../utils/constants';

export type Result = typeof WIN | typeof LOSE | typeof DRAW;

export type Round = {
  humanChoice: string;
  npcChoice: string;
  result: Result;
};
