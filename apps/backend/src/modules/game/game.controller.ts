import { NotFoundError } from "@mikro-orm/core";
import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from "@nestjs/common";
import { type CreateGameDTO, type GameDTO, GameSchema, IdSchema, type UpdateGameDTO } from '@packages/dtos';
import { ZodError } from "zod";
// biome-ignore lint/style/useImportType: <explanation>
import { GameService } from "./game.service";

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDTO): Promise<GameDTO> {
    try {
      GameSchema.parse(createGameDto);
      return await this.gameService.create(createGameDto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          `Invalid Game format: ${error.errors.map((err) => err.message).join(', ')}`,
        );
      }
      throw new InternalServerErrorException('Unexpected error occurred during game creation');
    }
  }

  @Get()
  async findAll(): Promise<GameDTO[]> {
    try {
      return await this.gameService.findAll();
    } catch {
      throw new InternalServerErrorException('Unexpected error occurred during game retrieval');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GameDTO> {
    try {
      const idToNumber = IdSchema.parse(id);
      return await this.gameService.findOne(idToNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid ID format');
      } 
      
      if (error instanceof NotFoundError) {
        throw new BadRequestException('Game not found');
      }
      
      throw new InternalServerErrorException('Unexpected error occurred during game retrieval');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDTO): Promise<GameDTO> {
    try {
      const idToNumber = IdSchema.parse(id);
      const parsedUpdateGameDTO = GameSchema.parse(updateGameDto);
      return await this.gameService.update(idToNumber, parsedUpdateGameDTO);
    } catch (error) {
      
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid input');
      }
      
      if (error instanceof NotFoundError) {
        throw new BadRequestException('Game not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during game update');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void>  {
    try {
      const idToNumber = IdSchema.parse(id);
      return await this.gameService.remove(idToNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid ID format');
      }
      
      if (error instanceof NotFoundError) {
        throw new BadRequestException('Game not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during game removal');
    }
  }
}