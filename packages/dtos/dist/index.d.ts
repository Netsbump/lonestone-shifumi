import { z } from 'zod';

declare const IdSchema: z.ZodNumber;
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
    players: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    players: number[];
}, {
    players: number[];
}>;
declare const ChoiceSchema: z.ZodObject<{
    playerId: z.ZodNumber;
    round: z.ZodNumber;
    action: z.ZodString;
}, "strip", z.ZodTypeAny, {
    playerId: number;
    round: number;
    action: string;
}, {
    playerId: number;
    round: number;
    action: string;
}>;
declare const PlayerPatchSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    avatar_path: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    avatar_path?: string | undefined;
}, {
    name?: string | undefined;
    avatar_path?: string | undefined;
}>;
declare const CreateRoundSchema: z.ZodObject<z.objectUtil.extendShape<{
    number: z.ZodNumber;
    game: z.ZodNumber;
}, {
    playersChoices: z.ZodArray<z.ZodObject<Pick<{
        playerId: z.ZodNumber;
        round: z.ZodNumber;
        action: z.ZodString;
    }, "playerId" | "action">, "strip", z.ZodTypeAny, {
        playerId: number;
        action: string;
    }, {
        playerId: number;
        action: string;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    number: number;
    game: number;
    playersChoices: {
        playerId: number;
        action: string;
    }[];
}, {
    number: number;
    game: number;
    playersChoices: {
        playerId: number;
        action: string;
    }[];
}>;
declare const ChoicePatchSchema: z.ZodObject<{
    playerId: z.ZodOptional<z.ZodNumber>;
    round: z.ZodOptional<z.ZodNumber>;
    action: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    playerId?: number | undefined;
    round?: number | undefined;
    action?: string | undefined;
}, {
    playerId?: number | undefined;
    round?: number | undefined;
    action?: string | undefined;
}>;
declare const RoundPatchSchema: z.ZodObject<{
    number: z.ZodOptional<z.ZodNumber>;
    game: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    number?: number | undefined;
    game?: number | undefined;
}, {
    number?: number | undefined;
    game?: number | undefined;
}>;

type GameDTO = {
    id: number;
    players: Array<Omit<PlayerDTO, 'avatar_path'>>;
};
type ChoiceDTO = {
    player: PlayerDTO;
    round: RoundDTO;
    action: string;
};
type PlayerDTO = {
    id: number;
    name: string;
    avatar_path: string;
};
type RoundDTO = {
    id: number;
    number: number;
    game: number;
    choices: Array<Omit<ChoiceDTO, 'round' | 'player'> & {
        player: number;
    }>;
};
type CreateGameDTO = z.infer<typeof GameSchema>;
type UpdateGameDTO = z.infer<typeof GameSchema>;
type CreatePlayerDTO = z.infer<typeof PlayerSchema>;
type UpdatePlayerDTO = z.infer<typeof PlayerSchema>;
type CreateChoiceDTO = z.infer<typeof ChoiceSchema>;
type UpdateChoiceDTO = z.infer<typeof ChoiceSchema>;
type CreateRoundDTO = z.infer<typeof CreateRoundSchema>;
type UpdateRoundDTO = Omit<z.infer<typeof CreateRoundSchema>, 'game'>;

declare enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

export { type ChoiceDTO, ChoicePatchSchema, ChoiceSchema, type CreateChoiceDTO, type CreateGameDTO, type CreatePlayerDTO, type CreateRoundDTO, CreateRoundSchema, type GameDTO, GameSchema, IdSchema, type PlayerDTO, PlayerPatchSchema, PlayerSchema, type RoundDTO, RoundPatchSchema, Status, type UpdateChoiceDTO, type UpdateGameDTO, type UpdatePlayerDTO, type UpdateRoundDTO };
