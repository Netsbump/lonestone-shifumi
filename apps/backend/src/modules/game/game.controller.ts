import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "../game/dto/create-game.dto";
import { UpdateGameDto } from "../game/dto/update-game.dto";

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    return await this.gameService.create(createGameDto);
  }

  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.gameService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return await this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.gameService.remove(+id);
  }
}