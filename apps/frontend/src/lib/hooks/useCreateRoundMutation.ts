import type { Choice } from '@packages/dtos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRound } from '../api/round';

export const useCreateRoundMutation = (gameId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ player }: { player: { name: string; action: Choice } }) =>
      createRound({ gameId, player }),
    {
      mutationKey: ['createRound', gameId],
      onSuccess: () => {
        queryClient.invalidateQueries(['game', gameId]);
        queryClient.invalidateQueries(['games']);
      },
    }
  );
};

