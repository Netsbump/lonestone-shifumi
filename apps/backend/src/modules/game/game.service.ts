// biome-ignore lint/style/useImportType: <explanation>
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type { CreateGameDTO, GameDTO, UpdateGameDTO } from '@packages/dtos';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class GameService {
  constructor(private readonly em: EntityManager) { }

  async create(createGameDto: CreateGameDTO): Promise<GameDTO> {
    return await this.em.transactional(async (em) => {
      const { playerName, opponentName } = createGameDto;
  
      let player = await em.findOne(Player, { name: playerName });
      if (!player) {
        player = new Player();
        player.name = playerName;
        player.avatar_path = '/images/avatar-human.svg';
        await em.persistAndFlush(player);
      }
  
      let opponent = await em.findOne(Player, { name: opponentName });
      if (!opponent) {
        opponent = new Player();
        opponent.name = opponentName;
        opponent.isNPC = opponentName === 'J-Ordi';
        opponent.avatar_path = opponent.isNPC 
        ? '/images/avatar-robot.svg' 
        : '/images/avatar-human.svg'; 
        await em.persistAndFlush(opponent);
      }
  
      const newGame = new Game();
      newGame.players.add(player, opponent);
      await em.persistAndFlush(newGame);
  
      const gameCreated = await em.findOneOrFail(Game, { id: newGame.id }, { populate: ["players"] });
  
      return {
        id: gameCreated.id,
        players: gameCreated.players.getItems(false).map(player => ({
          id: player.id, 
          name: player.name,
          avatar_path: player.avatar_path,
        }))
      };
    });
  }

  async findAll(): Promise<GameDTO[]> {

    const games = await this.em.findAll(Game, { populate: ['players']});

    return games.map( game => ({
      id: game.id,
      players: game.players.getItems(false).map(player => { return {
        id: player.id,
        name: player.name,
        avatar_path: player.avatar_path
      }})
    }))
  }

  async findOne(id: number): Promise<GameDTO> {
    const game = await this.em.findOneOrFail(Game, { id }, { populate: ['players'] } );

    return {
      id: game.id,
      players: game.players.getItems(false).map(player => { return {
        id: player.id, name: player.name, avatar_path: player.avatar_path
      }})
    }
  }

  async update(id: number, updateGameDto: UpdateGameDTO): Promise<GameDTO> {
    return await this.em.transactional(async (em) => {
      const gameToUpdate = await em.findOneOrFail(Game, { id }, { populate: ['players'] });
  
      const { playerName, opponentName } = updateGameDto;
  
      let player = await em.findOne(Player, { name: playerName });
      if (!player) {
        player = new Player();
        player.name = playerName;
        player.isNPC = false;
        await em.persistAndFlush(player);
      }

      let opponent = await em.findOne(Player, { name: opponentName });
      if (!opponent) {
        opponent = new Player();
        opponent.name = opponentName;
        opponent.isNPC = opponentName === 'J-Ordi';
        await em.persistAndFlush(opponent);
      }
  
      gameToUpdate.players.remove(gameToUpdate.players.getItems());
      gameToUpdate.players.add(player, opponent);

      await em.persistAndFlush(gameToUpdate);
  
      const gameUpdated = await em.findOneOrFail(Game, { id }, { populate: ['players'] });
  
      return {
        id: gameUpdated.id,
        players: gameUpdated.players.getItems(false).map(player => ({
          id: player.id,
          name: player.name,
          avatar_path: player.avatar_path,
        })),
      };
    });
  }

  async remove(id: number): Promise<void> {
    const game = await this.em.findOneOrFail(Game, { id });
    await this.em.remove(game).flush();
  }
}
