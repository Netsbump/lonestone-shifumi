import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGame } from '@/features/game/useGame';
import { createGame } from '@/lib/api/game';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/game/new')({
  component: SetupGameForm,
});

function SetupGameForm() {
  const navigate = Route.useNavigate();
  const { create } = useGame();
  const queryClient = useQueryClient();

   const { mutate , isLoading, isError } = useMutation(
    (playerName: string) => createGame({ playerName, opponentName: 'J-Ordi' }),
    {
      onSuccess: (gameData) => {

        create(gameData)

        queryClient.invalidateQueries(['games']);

        const gameId = gameData.id;
        navigate({ to: `/games/${gameId}`, replace: true });
      },
    }
  );

  const handleSubmitNewGame = (values: z.infer<typeof formSchema>) => {
    try {
      mutate(values.playerName)
    } catch (error) {
      console.error('Unexpected error occurred during game creation', error);
    }
  };
  
  const formSchema = z.object({
    playerName: z
      .string()
      .min(2, { message: 'playerName must be at least 2 characters.' })
      .max(16, { message: 'playerName can contain a maximum of 16 characters.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: '',
    },
  });

  if(isError){
    return <div>Error</div>
  }

  if(isLoading){
    return <div>Création de la nouvelle partie en cours...</div>
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitNewGame)}
        className="flex flex-col justify-center"
      >
        <FormField
          control={form.control}
          name="playerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player name</FormLabel>
              <FormControl>
                <Input placeholder="Shifu-Killer44" {...field} />
              </FormControl>
              <FormDescription>Choissisez un pseudo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="versus">Adversaire</Label>
          <Select>
            <SelectTrigger id="versus">
              <SelectValue placeholder="Selection d'un adversaire" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="npc">J-Ordi (NPC)</SelectItem>
              <SelectItem value="friend">Inviter un ami</SelectItem>
              <SelectItem value="random">Random</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Valider</Button>
      </form>
    </Form>
  );
}
