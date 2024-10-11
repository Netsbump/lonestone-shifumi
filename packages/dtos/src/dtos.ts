import { z } from "zod";
import { ChoiceSchema, GameSchema, PlayerSchema, RoundSchema } from "./schemas";

// DTOs for mapping entities to DTOs for controller response

export type GameDTO = {
    id: number;
    players: PlayerDTO[];
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
    // TODO: Consider including associated game IDs
}

export type RoundDTO = {
    id: number;
    number: number;
    game: number;
    choices: Array<Omit<ChoiceDTO, 'round' | 'player'> & { player: number }>; 
    //choices: { player: number, action: string }[]; 
}


// DTOs for handling front-end data in controller requests

export type CreateGameDTO = z.infer<typeof GameSchema>
export type UpdateGameDTO = z.infer<typeof GameSchema>

export type CreatePlayerDTO = z.infer<typeof PlayerSchema>
export type UpdatePlayerDTO = z.infer<typeof PlayerSchema>

export type CreateChoiceDTO = z.infer<typeof ChoiceSchema>
export type UpdateChoiceDTO = z.infer<typeof ChoiceSchema>

export type CreateRoundDTO = z.infer<typeof RoundSchema>
export type UpdateRoundDTO =  Omit<z.infer<typeof RoundSchema>, 'game'>;