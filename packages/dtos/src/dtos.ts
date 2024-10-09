import { Status } from "./enums";

export type GameDTO = {
    id: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date; 
    players: PlayerDTO[];
}

export type CreateGameDTO = {
    players: PlayerDTO[];
}

export type PlayerDTO = {
    id: number,
    name: string;
    avatar_path: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    games: GameDTO[];
}

export type ChoiceDTO = {
    id: number;
    action: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    rounds: RoundDTO[];
}

export type RoundDTO = {
    id: number;
    number: number;
    timer_status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    game: GameDTO;
    choices: ChoiceDTO[];
}