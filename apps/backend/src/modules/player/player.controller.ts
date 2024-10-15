import { NotFoundError } from "@mikro-orm/core";
import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from "@nestjs/common";
import type { PlayerDTO } from "@packages/dtos";
import { type CreatePlayerDTO, IdSchema, PlayerPatchSchema, PlayerSchema, type UpdatePlayerDTO } from "@packages/dtos";
import { ZodError } from "zod";
// biome-ignore lint/style/useImportType: <explanation>
import { PlayerService } from "./player.service";

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDTO) : Promise<PlayerDTO> {
    try {
      PlayerSchema.parse(createPlayerDto);
      return await this.playerService.create(createPlayerDto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          `Invalid Player format: ${error.errors.map((err) => err.message).join(', ')}`,
        );
      }
      throw new InternalServerErrorException('Unexpected error occurred during player creation');
    }
  }

  @Get()
  async findAll() : Promise<PlayerDTO[]> {
    try {
      return await this.playerService.findAll();
    } catch {
      throw new InternalServerErrorException('Unexpected error occurred during player retrieval');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<PlayerDTO> {    
    try {
      const idToNumber = IdSchema.parse(id);
      return await this.playerService.findOne(idToNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid ID format');
      }
      
      if (error instanceof NotFoundError) {
        throw new BadRequestException('Player not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during player retrieval');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDTO): Promise<PlayerDTO> {   
    try {
      const idToNumber = IdSchema.parse(id);
      const parsedUpdatePlayerDTO = PlayerPatchSchema.parse(updatePlayerDto);

      return await this.playerService.update(idToNumber, parsedUpdatePlayerDTO);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid input');
      } 
      
      if (error instanceof NotFoundError) {
        throw new BadRequestException('Player not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during player update');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const idToNumber = IdSchema.parse(id);
      return await this.playerService.remove(idToNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid ID format');
      }
      
      if (error instanceof NotFoundError) {
        throw new BadRequestException('Player not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during player removal');
    }
  }
}