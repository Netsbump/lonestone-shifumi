import { z } from 'zod';

declare const PLAYER = "player";
declare const OPPONENT = "opponent";
declare const DRAW = "draw";
declare const LEAF = "LEAF";
declare const STONE = "STONE";
declare const SCISSORS = "SCISSORS";
declare const FORFEIT = "FORFEIT";

declare enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

declare const IdSchema: z.ZodNumber;
declare const PlayerSchema: z.ZodObject<{
    name: z.ZodString;
    isNPC: z.ZodBoolean;
    avatar_path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    isNPC: boolean;
    avatar_path?: string | undefined;
}, {
    name: string;
    isNPC: boolean;
    avatar_path?: string | undefined;
}>;
declare const GameSchema: z.ZodObject<{
    playerName: z.ZodString;
    opponentName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    playerName: string;
    opponentName: string;
}, {
    playerName: string;
    opponentName: string;
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
    isNPC: z.ZodOptional<z.ZodBoolean>;
    avatar_path: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    isNPC?: boolean | undefined;
    avatar_path?: string | undefined;
}, {
    name?: string | undefined;
    isNPC?: boolean | undefined;
    avatar_path?: string | undefined;
}>;
declare const CreatePlayerChoiceSchema: z.ZodObject<Pick<{
    playerId: z.ZodNumber;
    round: z.ZodNumber;
    action: z.ZodString;
}, "playerId" | "action">, "strip", z.ZodTypeAny, {
    playerId: number;
    action: string;
}, {
    playerId: number;
    action: string;
}>;
declare const CreateRoundSchema: z.ZodObject<{
    gameId: z.ZodNumber;
    player: z.ZodObject<{
        name: z.ZodString;
        action: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        action: string;
    }, {
        name: string;
        action: string;
    }>;
}, "strip", z.ZodTypeAny, {
    player: {
        name: string;
        action: string;
    };
    gameId: number;
}, {
    player: {
        name: string;
        action: string;
    };
    gameId: number;
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

type Result = typeof PLAYER | typeof OPPONENT | typeof DRAW;
type Choice = typeof LEAF | typeof STONE | typeof SCISSORS | typeof FORFEIT;
type Round = {
    playerChoice: Choice;
    opponentChoice: Choice;
    roundResult: Result;
};

type GameDTO = {
    id: number;
    players: PlayerDTO[];
    status: Status;
    roundPlayed: number;
    historyRound?: Omit<RoundDTO, 'id' | 'game'>[];
};
type ChoiceDTO = {
    player: PlayerDTO;
    round: RoundDTO;
    action: Choice;
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
        playerID: number;
    }>;
    roundResult: Result;
};
type CreateGameDTO = z.infer<typeof GameSchema>;
type UpdateGameDTO = z.infer<typeof GameSchema>;
type CreatePlayerDTO = z.infer<typeof PlayerSchema>;
type UpdatePlayerDTO = z.infer<typeof PlayerSchema>;
type CreateChoiceDTO = z.infer<typeof ChoiceSchema>;
type UpdateChoiceDTO = z.infer<typeof ChoiceSchema>;
type CreateRoundDTO = z.infer<typeof CreateRoundSchema>;
type UpdateRoundDTO = Omit<z.infer<typeof CreateRoundSchema>, 'game'>;

export { type Choice, type ChoiceDTO, ChoicePatchSchema, ChoiceSchema, type CreateChoiceDTO, type CreateGameDTO, CreatePlayerChoiceSchema, type CreatePlayerDTO, type CreateRoundDTO, CreateRoundSchema, DRAW, FORFEIT, type GameDTO, GameSchema, IdSchema, LEAF, OPPONENT, PLAYER, type PlayerDTO, PlayerPatchSchema, PlayerSchema, type Result, type Round, type RoundDTO, RoundPatchSchema, SCISSORS, STONE, Status, type UpdateChoiceDTO, type UpdateGameDTO, type UpdatePlayerDTO, type UpdateRoundDTO };
