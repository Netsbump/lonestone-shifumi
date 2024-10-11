import { Module } from '@nestjs/common'
import { RoundController } from './round.controller'
import { RoundService } from './round.service'

@Module({
  imports: [],
  providers: [RoundService],
  exports: [],
  controllers: [RoundController],
})
export class RoundModule { }

