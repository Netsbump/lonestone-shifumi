import { Injectable } from '@nestjs/common';
import { CreatePlayerDTO, PlayerDTO, UpdatePlayerDTO } from '@packages/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly em: EntityManager) { }

  async create(createPlayerDto: CreatePlayerDTO): Promise<PlayerDTO> {

    const newPlayer = new Player();

    newPlayer.name = createPlayerDto.name
    if (createPlayerDto.avatar_path){
        newPlayer.avatar_path = createPlayerDto.avatar_path
    }

    await this.em.persistAndFlush(newPlayer); 
    
    return {
      id: newPlayer.id,
      name: newPlayer.name,
      avatar_path: newPlayer.avatar_path || '',
    };
  }

  async findAll(): Promise<PlayerDTO[]> {
    const players = await this.em.findAll(Player);

    return players.map(player => ({
      id: player.id,
      name: player.name,
      avatar_path: player.avatar_path || ''
    }))
  }

  async findOne(id: number) : Promise<PlayerDTO>{

    const player = await this.em.findOneOrFail(Player, { id });

    return {
      id: player.id,
      name: player.name,
      avatar_path: player.avatar_path || '',
    };
  }

  async update(id: number, updatePlayerDto: Partial<UpdatePlayerDTO>): Promise<PlayerDTO> {

    const player = await this.em.findOneOrFail(Player, { id });

    //Todo gestion de l'erreur sur la non unicité possible du nouveau name
    player.name = updatePlayerDto.name
    if (updatePlayerDto.avatar_path){
        player.avatar_path = updatePlayerDto.avatar_path
    }

    await this.em.persistAndFlush(player); 

    const playerUpdated = await this.em.findOneOrFail(Player, { id: player.id })

    return {
      id: playerUpdated.id,
      name: playerUpdated.name,
      avatar_path: playerUpdated.avatar_path || '',
    };
  }

  async remove(id: number) : Promise<void> {
    const player = await this.em.findOneOrFail(Player, { id });
    await this.em.remove(player).flush();
  }
}
