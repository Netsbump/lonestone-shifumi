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
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
export const Route = createFileRoute('/game/new')({
  component: SetupGameForm,
});

function SetupGameForm() {
  //const navigate = Route.useNavigate();

  const handleSubmitNewGame = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //Création de la partie: ajouter un hook createLobby ou createGame
    //Redirection /games/id
    //Startgame doit juste lancer la game
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitNewGame)} className="flex flex-col justify-center">
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
    // <form action="" method="get" className="form-example">
    //   <div className="form-example">
    //     <label htmlFor="name">Entrez votre nom</label>
    //     <input type="text" name="name" id="name" required />
    //   </div>

    //   <div className="form-example">
    //     <p>Choissisez votre adversaire</p>
    //     <select>
    //       <option>J-Ordi (NPC)</option>
    //       <option>Inviter un ami</option>
    //       <option>Random player</option>
    //     </select>
    //   </div>
    //   <div className="form-example">
    //     <p>Choissisez votre type de partie</p>
    //     <select>
    //       <option>Normal</option>
    //       <option>Super Partie</option>
    //     </select>
    //   </div>
    // </form>
  );
}
