import { useGame } from "@/features/game/useGame";
import type { GameDTO } from "@packages/dtos";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../api/game";

export const useFetchGameQuery = (gameId: number) => {

    const { update } = useGame();

    return useQuery<GameDTO, Error>(
        ['game', gameId],
    () => fetchGame(Number(gameId)),
    {
      staleTime: 1000 * 60 * 1,
      onSuccess: (gameData) => {
        update(gameData)
      },
    })
}

