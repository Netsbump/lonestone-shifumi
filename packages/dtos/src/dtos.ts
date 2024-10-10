import { z } from "zod";
import { Status } from "./enums";
import { GameSchema, PlayerSchema } from "./schemas";

export type GameDTO = {
    id: number;
    players: PlayerDTO[];
}

export type CreateGameDTO = z.infer<typeof GameSchema>
export type UpdateGameDTO = z.infer<typeof GameSchema>

export type PlayerDTO = {
    id: number;
    name: string;
    avatar_path: string;
    //todo : est ce que j'ajoute les games associés ou non ?
}

export type CreatePlayerDTO = z.infer<typeof PlayerSchema>
export type UpdatePlayerDTO = z.infer<typeof PlayerSchema>

export type ChoiceDTO = {
    player: PlayerDTO;
    rounds: RoundDTO;
    action: string;
}

export type RoundDTO = {
    id: number;
    number: number;
    game: GameDTO;
    choices: ChoiceDTO[];
}