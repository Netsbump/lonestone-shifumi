import type { DRAW, FORFEIT, LEAF, OPPONENT, PLAYER, SCISSORS, STONE } from "./constants";

export type Result = typeof PLAYER | typeof OPPONENT | typeof DRAW;

export type Choice = typeof LEAF | typeof STONE | typeof SCISSORS | typeof FORFEIT;

export type Round = {
    playerChoice: Choice;
    opponentChoice: Choice;
    roundResult: Result;
};

