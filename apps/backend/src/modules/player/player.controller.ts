import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PlayerService } from "./player.service";
import { CreatePlayerDTO, UpdatePlayerDTO } from "@packages/dtos";
import { PlayerDTO } from "@packages/dtos";
import { entityToDTO } from "./player.entityToDTO";

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDTO) : Promise<PlayerDTO> {
    const playerCreated =  await this.playerService.create(createPlayerDto);
    return entityToDTO(playerCreated)
  }

  @Get()
  async findAll() : Promise<PlayerDTO[]> {
    const players = await this.playerService.findAll();
    return players.map(player => entityToDTO(player)) 
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<PlayerDTO> {
    const player =  await this.playerService.findOne(+id);
    return entityToDTO(player);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDTO): Promise<PlayerDTO> {
    const playerUpdated =  await this.playerService.update(+id, updatePlayerDto);
    return entityToDTO(playerUpdated);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.playerService.remove(+id);
  }
}