import { PlayerDTO } from "@packages/dtos";
import { Player } from "src/entities/player.entity";

export function entityToDTO(player: Player): PlayerDTO {
    return {
        id: player.id,
        name: player.name,
        avatar_path: player.avatar_path || '',

    }
}