import { Injectable } from '@nestjs/common';
import { CreateRoundDTO, UpdateRoundDTO } from '@packages/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Round } from 'src/entities/round.entity';
import { RoundDTO } from '@packages/dtos';
import { Game } from 'src/entities/game.entity';

@Injectable()
export class RoundService {
  constructor(private readonly em: EntityManager) { }

  async create(createRoundDto: CreateRoundDTO): Promise<RoundDTO> {

    const game = await this.em.findOneOrFail(Game, { id: createRoundDto.game })

    const newRound = new Round();

    newRound.number = createRoundDto.number
    newRound.game = game

    await this.em.persistAndFlush(newRound); 
    
    const roundCreated =  await this.em.findOne(Round, { id: newRound.id}, { populate: ["choices"]})

    return {
      id: roundCreated.id,
      number: roundCreated.number,
      game: roundCreated.game.id,
      choices: roundCreated.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
    }
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
    const round =  await this.em.findOne(Round, { id }, { populate: ['choices'] });

    return {
      id: round.id,
      number: round.number,
      game: round.game.id,
      choices: round.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
    }
  }

  async update(id: number, updateRoundDto: UpdateRoundDTO): Promise<RoundDTO> {

    const round = await this.em.findOne(Round, { id });

    if(!round){
      throw new Error(`Round with id ${id} not found`);
    }

    round.number = updateRoundDto.number
    
    await this.em.persistAndFlush(round); 

    const roundUpdated = await this.em.findOne(Round, { id: round.id}, { populate: ["choices"]})

    return {
      id: roundUpdated.id,
      number: roundUpdated.number,
      game: roundUpdated.game.id,
      choices: roundUpdated.choices.getItems(false).map(choice => {return { player: choice.player.id, action: choice.action }})
    }
    
  }

  async remove(id: number) {
    const round = await this.em.findOne(Round, { id });

    if (!round) {
      throw new Error(`Round with id ${id} not found`);
    }

    await this.em.remove(round).flush();
  }
}
