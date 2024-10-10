import { z } from 'zod';

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

type GameDTO = {
    id: number;
    players: PlayerDTO[];
};
type CreateGameDTO = z.infer<typeof GameSchema>;
type UpdateGameDTO = z.infer<typeof GameSchema>;
type PlayerDTO = {
    id: number;
    name: string;
    avatar_path: string;
};
type CreatePlayerDTO = z.infer<typeof PlayerSchema>;
type UpdatePlayerDTO = z.infer<typeof PlayerSchema>;
type ChoiceDTO = {
    player: PlayerDTO;
    rounds: RoundDTO;
    action: string;
};
type RoundDTO = {
    id: number;
    number: number;
    game: GameDTO;
    choices: ChoiceDTO[];
};

declare enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

export { type ChoiceDTO, type CreateGameDTO, type CreatePlayerDTO, type GameDTO, GameSchema, type PlayerDTO, PlayerSchema, type RoundDTO, Status, type UpdateGameDTO, type UpdatePlayerDTO };
