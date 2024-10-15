import type { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type { CreateGameDTO, GameDTO, UpdateGameDTO } from '@packages/dtos';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class GameService {
  constructor(private readonly em: EntityManager) { }

  async create(createGameDto: CreateGameDTO): Promise<GameDTO> {
    const players = await this.em.find(Player, { id: { $in: createGameDto.players } });

    const newGame = new Game();
    newGame.players.add(players);
  
    await this.em.persistAndFlush(newGame); 

    const gameCreated = await this.em.findOneOrFail(Game, { id: newGame.id }, { populate: ["players"]})

    return {
      id: gameCreated.id,
      players: gameCreated.players.getItems(false).map(player => { return {
        id: player.id, name: player.name 
      }})
    }
  }

  async findAll(): Promise<GameDTO[]> {

    const games = await this.em.findAll(Game, { populate: ['players']});

    return games.map( game => ({
      id: game.id,
      players: game.players.getItems(false).map(player => { return {
        id: player.id,
        name: player.name
      }})
    }))
  }

  async findOne(id: number): Promise<GameDTO> {
    const game = await this.em.findOneOrFail(Game, { id }, { populate: ['players'] } );

    return {
      id: game.id,
      players: game.players.getItems(false).map(player => { return {
        id: player.id, name: player.name 
      }})
    }
  }

  async update(id: number, updateGameDto: UpdateGameDTO): Promise<GameDTO> {
    const gameToUpdate = await this.em.findOneOrFail(Game, { id });

    const players = await this.em.find(Player, { id: { $in: updateGameDto.players } });
    gameToUpdate.players.set(players)
    
    await this.em.persistAndFlush(gameToUpdate); 

    const gameUpdated = await this.em.findOneOrFail(Game, { id }, { populate: ['players']})

    return {
      id: gameUpdated.id,
      players: gameUpdated.players.getItems(false).map(player => { return {
        id: player.id, name: player.name 
      }})
    }
  }

  async remove(id: number): Promise<void> {
    const game = await this.em.findOneOrFail(Game, { id });
    await this.em.remove(game).flush();
  }
}
