import type { z } from "zod";
import type { Status } from "./enums";
import type { ChoiceSchema, CreateRoundSchema, GameSchema, PlayerSchema } from "./schemas";
import type { Choice, Result } from "./types";

// DTOs for mapping entities to DTOs for controller response
export type GameDTO = {
    id: number;
    players: PlayerDTO[];
    status: Status,
    roundPlayed: number;
    historyRound?: {playerChoice: Choice, opponentChoice: Choice, roundResult: Result}[]
}

export type ChoiceDTO = {
    player: PlayerDTO;
    round: RoundDTO;
    action: string;
}

export type PlayerDTO = {
    id: number;
    name: string;
    avatar_path: string;
}

//Todo: a faire évoluer en ajoutant les choix des joueurs
export type RoundDTO = {
    id: number;
    number: number;
    game: number;
    choices: Array<Omit<ChoiceDTO, 'round' | 'player' > & { player: number }>;
    roundResult: string;
}


// DTOs for handling front-end data in controller requests
export type CreateGameDTO = z.infer<typeof GameSchema>
export type UpdateGameDTO = z.infer<typeof GameSchema>

export type CreatePlayerDTO = z.infer<typeof PlayerSchema>
export type UpdatePlayerDTO = z.infer<typeof PlayerSchema>

export type CreateChoiceDTO = z.infer<typeof ChoiceSchema>
export type UpdateChoiceDTO = z.infer<typeof ChoiceSchema>

export type CreateRoundDTO = z.infer<typeof CreateRoundSchema>
export type UpdateRoundDTO =  Omit<z.infer<typeof CreateRoundSchema>, 'game'>;