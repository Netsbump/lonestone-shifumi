import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './mikro-orm.config';
import { GameModule } from './modules/game/game.module';
import { PlayerModule } from './modules/player/player.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    GameModule,
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
