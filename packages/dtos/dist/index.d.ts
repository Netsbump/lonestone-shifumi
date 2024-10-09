import { z } from 'zod';

declare enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

type GameDTO = {
    id: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    players: PlayerDTO[];
};
type CreateGameDTO = {
    players: PlayerDTO[];
};
type PlayerDTO = {
    id: number;
    name: string;
    avatar_path: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    games: GameDTO[];
};
type ChoiceDTO = {
    id: number;
    action: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    rounds: RoundDTO[];
};
type RoundDTO = {
    id: number;
    number: number;
    timer_status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    game: GameDTO;
    choices: ChoiceDTO[];
};

declare const PlayerSchema: z.ZodObject<{
    name: z.ZodString;
    avatar_path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    avatar_path?: string | undefined;
}, {
    name: string;
    avatar_path?: string | undefined;
}>;
declare const GameSchema: z.ZodObject<{
    players: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        avatar_path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        avatar_path?: string | undefined;
    }, {
        name: string;
        avatar_path?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    players: {
        name: string;
        avatar_path?: string | undefined;
    }[];
}, {
    players: {
        name: string;
        avatar_path?: string | undefined;
    }[];
}>;

export { type ChoiceDTO, type CreateGameDTO, type GameDTO, GameSchema, type PlayerDTO, PlayerSchema, type RoundDTO, Status };
