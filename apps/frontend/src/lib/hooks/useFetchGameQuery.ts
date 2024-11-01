import { useGame } from "@/features/game/useGame";
import type { GameDTO } from "@packages/dtos";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../api/game";

export const useFetchGameQuery = (gameId: number, options = {}) => {

    const { update } = useGame();

    return useQuery<GameDTO, Error>(
        ['game', gameId],
    () => fetchGame(Number(gameId)),
    {
      ...options,
      onSuccess: (gameData) => {
        update(gameData)
      },
    })
}

