import { Injectable } from '@nestjs/common';
import { CreateRoundDTO, UpdateRoundDTO } from '@packages/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Round } from 'src/entities/round.entity';
import { RoundDTO } from '@packages/dtos';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { Choice } from 'src/entities/choice.entity';

@Injectable()
export class RoundService {
  constructor(private readonly em: EntityManager) { }

  async create(createRoundDto: CreateRoundDTO): Promise<RoundDTO> {

    const { number: roundNumber, game: gameID, playersChoices } = createRoundDto;

    return await this.em.transactional( async (em) => {

      const game = await em.findOneOrFail(Game, { id: gameID})

      const round = new Round();
      round.number = roundNumber;
      round.game = game
      await em.persistAndFlush(round);

      for (const playerChoice of playersChoices){
        const player = await em.findOneOrFail(Player, playerChoice.playerId);

        const choice = new Choice();
        choice.player = player;
        choice.round = round;
        choice.action = playerChoice.action

        await em.persistAndFlush(choice);
      }

      const roundCreated =  await this.em.findOneOrFail(Round, { id: round.id}, { populate: ["choices"]})

      return {
        id: roundCreated.id,
        number: roundCreated.number,
        game: roundCreated.game.id,
        choices: roundCreated.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
      }
      
    })
  }

  async findAll(): Promise<RoundDTO[]> {

    const rounds = await this.em.findAll(Round, { populate: ['choices'] });

    return rounds.map( round => ({
      id: round.id,
      number: round.number,
      game: round.game.id,
      choices: round.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
    }))
  }

  async findOne(id: number): Promise<RoundDTO> {
    const round =  await this.em.findOneOrFail(Round, { id }, { populate: ['choices'] });

    return {
      id: round.id,
      number: round.number,
      game: round.game.id,
      choices: round.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
    }
  }

  async update(id: number, updateRoundDto: Partial<UpdateRoundDTO>): Promise<RoundDTO> {

    const round = await this.em.findOneOrFail(Round, { id });

    round.number = updateRoundDto.number
    
    await this.em.persistAndFlush(round); 

    const roundUpdated = await this.em.findOneOrFail(Round, { id: round.id}, { populate: ["choices"]})

    return {
      id: roundUpdated.id,
      number: roundUpdated.number,
      game: roundUpdated.game.id,
      choices: roundUpdated.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
    }
    
  }

  async remove(id: number): Promise<void> {
    const round = await this.em.findOneOrFail(Round, { id });
    await this.em.remove(round).flush();
  }
}
