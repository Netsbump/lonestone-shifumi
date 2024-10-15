import {
  type DRAW,
  type FINISHED,
  type FORFEIT,
  type IN_PROGRESS,
  type LEAF,
  type NOT_STARTED,
  OPPONENT,
  PLAYER,
  type SCISSORS,
  type STONE,
} from '../utils/constants';

export type Result = typeof PLAYER | typeof OPPONENT | typeof DRAW;

export type Round = {
  playerChoice: Choice;
  opponentChoice: Choice;
  roundResult: Result;
};

export type Choice = typeof LEAF | typeof STONE | typeof SCISSORS | typeof FORFEIT;

export type GameStatus = typeof NOT_STARTED | typeof IN_PROGRESS | typeof FINISHED;

export type Rules = Record<
  Choice,
  {
    beat: Choice;
  }
>;

export type VisualElements = Record<
  Choice,
  {
    iconSrc: string;
    iconAlt: string;
    text: string;
  }
>;

export type TimerProgressBar = typeof NOT_STARTED | typeof IN_PROGRESS | typeof FINISHED;

export type RoundStatus = {
  roundNumber: number;
  timerProgressBarStatus: TimerProgressBar;
};

export type Player = {
  name: string;
  avatar: {
    imgPath: string;
    alt: string;
  };
};

export type Game = {
  gameStatus: GameStatus;
  roundStatus: RoundStatus[];
  history: Round[];
  players: {
    [PLAYER]: Player;
    [OPPONENT]: Player;
  };
};
