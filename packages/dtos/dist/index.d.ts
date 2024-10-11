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
    player: z.ZodNumber;
    round: z.ZodNumber;
    action: z.ZodString;
}, "strip", z.ZodTypeAny, {
    player: number;
    round: number;
    action: string;
}, {
    player: number;
    round: number;
    action: string;
}>;
declare const RoundSchema: z.ZodObject<{
    number: z.ZodNumber;
    game: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    number: number;
    game: number;
}, {
    number: number;
    game: number;
}>;

type GameDTO = {
    id: number;
    players: PlayerDTO[];
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
type CreateRoundDTO = z.infer<typeof RoundSchema>;
type UpdateRoundDTO = Omit<z.infer<typeof RoundSchema>, 'game'>;

declare enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

export { type ChoiceDTO, ChoiceSchema, type CreateChoiceDTO, type CreateGameDTO, type CreatePlayerDTO, type CreateRoundDTO, type GameDTO, GameSchema, IdSchema, type PlayerDTO, PlayerSchema, type RoundDTO, RoundSchema, Status, type UpdateChoiceDTO, type UpdateGameDTO, type UpdatePlayerDTO, type UpdateRoundDTO };
