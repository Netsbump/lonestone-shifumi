// biome-ignore lint/style/useImportType: <explanation>
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type { CreateRoundDTO, RoundDTO } from '@packages/dtos';
import { Choice } from 'src/entities/choice.entity';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { Round } from 'src/entities/round.entity';
import { determineRoundResult } from 'src/utils/determineRoundResult';
import { getRandomChoice } from 'src/utils/getRandomChoice';

@Injectable()
export class RoundService {
  constructor(private readonly em: EntityManager) {}

  async create(createRoundDto: CreateRoundDTO): Promise<RoundDTO> {
    const { gameId, player: playerOne } = createRoundDto;

    return await this.em.transactional(async (em) => {

      // 1. Récupérer la game concernnée
      const game = await em.findOneOrFail(Game, { id: gameId });

      // 2. Récupérer le joueur 
      const player = await em.findOneOrFail(Player, { name: playerOne.name})

      // 3. Récupérer le npc
      const opponent = await em.findOneOrFail(Player, { name: 'J-Ordi'})

      // 4. Déterminer le numéro du round
      const rounds = await em.find(Round, { game: game.id });
      const roundNumber = rounds.length + 1;

      // 5. Créer un round
      const round = new Round();
      round.number = roundNumber;
      round.game = game;

      // 6. Créer le choice pour le joueur
      const choicePlayer = new Choice();
      choicePlayer.player = player;
      choicePlayer.round = round;
      choicePlayer.action = playerOne.action;

      // 7. Créer le choice pour le npc
      const choiceOpponent = new Choice();
      choiceOpponent.player = opponent;
      choiceOpponent.round = round;
      choiceOpponent.action = getRandomChoice();

      // 8. Persister chaque choix explicitement
      await em.persistAndFlush(choicePlayer);
      await em.persistAndFlush(choiceOpponent);

      // 9. Ajouter les choix au round
      round.choices.add(choicePlayer, choiceOpponent);

      // 10. Persister le round et les choix
      await em.persistAndFlush(round);
 
      const roundCreated = await em.findOne(
        Round,
        { id: round.id },
        { populate: ['choices'] },
      );

      // 11. Calculer et ajouter le roundResult
      const roundResult = determineRoundResult(roundCreated.choices[0].action, roundCreated.choices[1].action)
      
      return {
        id: roundCreated.id,
        number: roundCreated.number,
        game: roundCreated.game.id,
        choices: roundCreated.choices.getItems(false).map((choice) => {
          return { player: choice.player.id, action: choice.action };
        }),
        roundResult: roundResult
      };
    });
  }

  async findAll(): Promise<Omit<RoundDTO, 'roundResult'>[]> {
    const rounds = await this.em.findAll(Round, { populate: ['choices'] });

    return rounds.map((round) => ({
      id: round.id,
      number: round.number,
      game: round.game.id,
      choices: round.choices.getItems(false).map((choice) => {
        return { player: choice.player.id, action: choice.action };
      }),
    }));
  }

  async findOne(id: number): Promise<Omit<RoundDTO, 'roundResult'>> {
    const round = await this.em.findOneOrFail(Round, { id }, { populate: ['choices'] });

    return {
      id: round.id,
      number: round.number,
      game: round.game.id,
      choices: round.choices.getItems(false).map((choice) => {
        return { player: choice.player.id, action: choice.action };
      }),
    };
  }

  // async update(id: number, updateRoundDto: Partial<UpdateRoundDTO>): Promise<RoundDTO> {
  //   const round = await this.em.findOneOrFail(Round, { id });

  //   round.number = updateRoundDto.number;

  //   await this.em.persistAndFlush(round);

  //   const roundUpdated = await this.em.findOneOrFail(
  //     Round,
  //     { id: round.id },
  //     { populate: ['choices'] },
  //   );

  //   return {
  //     id: roundUpdated.id,
  //     number: roundUpdated.number,
  //     game: roundUpdated.game.id,
  //     choices: roundUpdated.choices.getItems(false).map((choice) => {
  //       return { player: choice.player.id, action: choice.action };
  //     }),
  //   };
  // }

  async remove(id: number): Promise<void> {
    const round = await this.em.findOneOrFail(Round, { id });
    await this.em.remove(round).flush();
  }
}
