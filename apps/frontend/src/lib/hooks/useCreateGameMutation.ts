import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGame } from "../api/game";

export const useCreateGameMutation = () => {
const queryClient = useQueryClient();

return useMutation(
 (playerName: string) => createGame({ playerName, opponentName: 'J-Ordi' }),
 {
   onSuccess: (gameData) => {
    queryClient.invalidateQueries(['games']);
     return gameData;
   },
 }
);
}