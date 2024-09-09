import {
  DRAW,
  FINISHED,
  IN_PROGRESS,
  LEAF,
  NOT_STARTED,
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

export type GameStatus =
  | typeof NOT_STARTED
  | typeof IN_PROGRESS
  | typeof FINISHED;

export type Player = {
  name: string;
  avatar: {
    imgPath: string;
    alt: string;
  };
};

export type Game = {
  gameStatus: GameStatus;
  currentRound: number;
  history: Round[];
  players: {
    [PLAYER]: Player;
    [OPPONENT]: Player;
  };
};
