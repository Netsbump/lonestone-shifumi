import {
  BadRequestException,
  InternalServerErrorException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoundService } from './round.service';
import { CreateRoundDTO, RoundPatchSchema, UpdateRoundDTO, IdSchema, RoundDTO, CreateRoundSchema } from '@packages/dtos';
import { ZodError } from 'zod';
import { NotFoundError } from '@mikro-orm/core';

@Controller('rounds')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post()
  async create(@Body() createRoundDto: CreateRoundDTO): Promise<RoundDTO> {
    try {
      CreateRoundSchema.parse(createRoundDto);
      return await this.roundService.create(createRoundDto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          'Invalid Round format: ' + error.errors.map((err) => err.message).join(', '),
        );
      }
      throw new InternalServerErrorException('Unexpected error occurred during round creation');
    }
  }

  @Get()
  async findAll(): Promise<RoundDTO[]> {
    try {
      return await this.roundService.findAll();
    } catch {
      throw new InternalServerErrorException('Unexpected error occurred during round retrieval');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoundDTO> {
    try {
      const idToNumber = IdSchema.parse(id);
      return await this.roundService.findOne(idToNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid ID format');
      } else if (error instanceof NotFoundError) {
        throw new BadRequestException('Round not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during round retrieval');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDTO): Promise<RoundDTO> {
    try {
      const idToNumber = IdSchema.parse(id);
      const parsedUpdateRoundDTO = RoundPatchSchema.parse(updateRoundDto);
      return await this.roundService.update(idToNumber, parsedUpdateRoundDTO);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid input');
      } else if (error instanceof NotFoundError) {
        throw new BadRequestException('Round not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during round update');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const idToNumber = IdSchema.parse(id);
      return await this.roundService.remove(idToNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Invalid ID format');
      } else if (error instanceof NotFoundError) {
        throw new BadRequestException('Round not found');
      }
      throw new InternalServerErrorException('Unexpected error occurred during round removal');
    }
  }
}
