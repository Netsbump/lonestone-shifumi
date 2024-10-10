import { Module } from '@nestjs/common'
import { PlayerController } from './player.controller'
import { PlayerService } from './player.service'

@Module({
  imports: [],
  providers: [PlayerService],
  exports: [],
  controllers: [PlayerController],
})
export class PlayerModule { }

