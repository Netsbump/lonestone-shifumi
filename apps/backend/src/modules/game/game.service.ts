import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { EntityManager } from '@mikro-orm/core';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class GameService {
  constructor(private readonly em: EntityManager) { }

  async create(createGameDto: CreateGameDto) {
    const players = await this.em.find(Player, { id: { $in: createGameDto.players } });

    const newGame = new Game();
    newGame.players.add(players);
  
    await this.em.persistAndFlush(newGame); 
  
    return newGame;
  }

  async findAll(): Promise<Game[]> {
    return await this.em.findAll(Game);
  }

  async findOne(id: number) {
    return await this.em.findOne(Game, { id });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const gameToUpdate = await this.em.findOne(Game, { id });

    if(!gameToUpdate){
      throw new Error(`Game with id ${id} not found`);
    }

    const players = await this.em.find(Player, { id: { $in: updateGameDto.players } });
    gameToUpdate.players.set(players)
    
    await this.em.persistAndFlush(gameToUpdate); 

    return gameToUpdate;
  }

  async remove(id: number) {
    const game = await this.em.findOne(Game, { id });

    if (!game) {
      throw new Error(`Game with id ${id} not found`);
    }

    await this.em.remove(game).flush();
  }
}
