import { Injectable } from '@nestjs/common';
import { CreatePlayerDTO, UpdatePlayerDTO } from '@packages/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly em: EntityManager) { }

  async create(createPlayerDto: CreatePlayerDTO) {

    const newPlayer = new Player();

    newPlayer.name = createPlayerDto.name
    if (createPlayerDto.avatar_path){
        newPlayer.avatar_path = createPlayerDto.avatar_path
    }

    await this.em.persistAndFlush(newPlayer); 
  
    return newPlayer;
  }

  async findAll(): Promise<Player[]> {
    return await this.em.findAll(Player);
  }

  async findOne(id: number){
    return await this.em.findOne(Player, { id });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDTO) {

    const player = await this.em.findOne(Player, { id });

    if(!player){
      throw new Error(`Player with id ${id} not found`);
    }

    //Todo gestion de l'erreur sur la non unicité possible du nouveau name
    player.name = updatePlayerDto.name
    if (updatePlayerDto.avatar_path){
        player.avatar_path = updatePlayerDto.avatar_path
    }

    
    await this.em.persistAndFlush(player); 

    return player;
  }

  async remove(id: number) {
    const player = await this.em.findOne(Player, { id });

    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }

    await this.em.remove(player).flush();
  }
}
