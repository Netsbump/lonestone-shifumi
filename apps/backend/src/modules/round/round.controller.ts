import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { RoundService } from "./round.service";
import { CreateRoundDTO, UpdateRoundDTO } from "@packages/dtos";
import { RoundDTO, IdSchema, RoundSchema } from "@packages/dtos";

@Controller('rounds')
export class RoundController {
    constructor(private readonly roundService: RoundService) {}

  @Post()
  async create(@Body() createRoundDto: CreateRoundDTO) : Promise<RoundDTO> {

    const parsedCreateRoundDTO = RoundSchema.safeParse(createRoundDto);

    if (!parsedCreateRoundDTO.success) {
      throw new BadRequestException('Invalid Round format');
    }

    return await this.roundService.create(parsedCreateRoundDTO.data);
  }

  @Get()
  async findAll() : Promise<RoundDTO[]> {
    return await this.roundService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<RoundDTO> {

    const idToNumber = Number(id)
    const parseId = IdSchema.safeParse(idToNumber)

    if (!parseId.success) {
      throw new BadRequestException('Invalid ID format');
    }

    return await this.roundService.findOne(parseId.data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDTO): Promise<RoundDTO> {

    const idToNumber = Number(id)
    const parseId = IdSchema.safeParse(idToNumber)

    if (!parseId.success) {
      throw new BadRequestException('Invalid ID format');
    }

    return await this.roundService.update(parseId.data, updateRoundDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {

    const idToNumber = Number(id)
    const parseId = IdSchema.safeParse(idToNumber)

    if (!parseId.success) {
      throw new BadRequestException('Invalid ID format');
    }

    return await this.roundService.remove(parseId.data);
  }
}