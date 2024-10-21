// biome-ignore lint/style/useImportType: <explanation>
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type {
  Choice,
  CreateGameDTO,
  GameDTO,
  Result,
  RoundDTO,
  UpdateGameDTO
} from '@packages/dtos';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { Round } from 'src/entities/round.entity';
import { determineGameStatus } from 'src/utils/determineGameStatus';
import { determineRoundResult } from 'src/utils/determineRoundResult';
@Injectable()
export class GameService {
  constructor(private readonly em: EntityManager) {}

  async create(createGameDto: CreateGameDTO): Promise<Pick<GameDTO, 'id' | 'players'>> {
    return await this.em.transactional(async (em) => {
      const { playerName, opponentName } = createGameDto;

      let player = await em.findOne(Player, { name: playerName });
      if (!player) {
        player = new Player();
        player.name = playerName;
        player.avatar_path = '/images/avatar-human.svg';
        await em.persistAndFlush(player);
      }

      let opponent = await em.findOne(Player, { name: opponentName });
      if (!opponent) {
        opponent = new Player();
        opponent.name = opponentName;
        opponent.isNPC = opponentName === 'J-Ordi';
        opponent.avatar_path = opponent.isNPC
          ? '/images/avatar-robot.svg'
          : '/images/avatar-human.svg';
        await em.persistAndFlush(opponent);
      }

      const newGame = new Game();
      newGame.players.add(player, opponent);
      await em.persistAndFlush(newGame);

      const gameCreated = await em.findOneOrFail(
        Game,
        { id: newGame.id },
        { populate: ['players'] },
      );

      return {
        id: gameCreated.id,
        players: gameCreated.players.getItems(false).map((player) => ({
          id: player.id,
          name: player.name,
          avatar_path: player.avatar_path,
        })),
      };
    });
  }

  async findAll(): Promise<Omit<GameDTO, 'players'>[]> {
    const games = await this.em.findAll(Game);

    // Tableau pour collecter les résultats
    const gameStatuses: Omit<GameDTO, 'players'>[] = [];

    // Récupérer les rounds associés à chaque game de manière parallèle
    await Promise.all(
      games.map(async (game) => {
        const rounds = await this.em.find(Round, { game: game.id }, { populate: ['choices'] });

        const roundPlayed = rounds.length;

        const status = determineGameStatus(roundPlayed, rounds);

        gameStatuses.push({
          id: game.id,
          status,
          roundPlayed,
        });
      }),
    );

    return gameStatuses;
  }

  async findOne(id: number): Promise<GameDTO> {
    const game = await this.em.findOneOrFail(Game, { id }, { populate: ['players'] });

    const rounds = await this.em.find(Round, { game: game.id }, { populate: ['choices'] });

    const roundPlayed = rounds.length;

    const status = determineGameStatus(roundPlayed, rounds);
    
    const roundResults: Result[] = [];

    if (roundPlayed > 0) {
      for (const round of rounds) {
        if (round.choices.length === 2) {
          roundResults.push(determineRoundResult(round.choices[0].action, round.choices[1].action));
        }
      }
    }

    const historyRound: Array<Omit<RoundDTO, 'id' | 'game'>> = [];
    for (let i = 0; i < rounds.length; i++) {
      historyRound.push({
        number: rounds[i].number,
        choices: [{
          playerID: rounds[i].choices[0].player.id,
          action: rounds[i].choices[0].action as Choice,
        }, {
          playerID: rounds[i].choices[1].player.id,
          action: rounds[i].choices[1].action as Choice,
        }],
        roundResult: roundResults[i],
      });
    }


    return {
      id: game.id,
      status,
      roundPlayed,
      players: game.players.getItems(false).map((player) => {
        return {
          id: player.id,
          name: player.name,
          avatar_path: player.avatar_path,
        };
      }),
      historyRound: historyRound,
    };
  }

  async update(id: number, updateGameDto: UpdateGameDTO): Promise<Pick<GameDTO, 'id' | 'players'>> {
    return await this.em.transactional(async (em) => {
      const gameToUpdate = await em.findOneOrFail(Game, { id }, { populate: ['players'] });

      const { playerName, opponentName } = updateGameDto;

      let player = await em.findOne(Player, { name: playerName });
      if (!player) {
        player = new Player();
        player.name = playerName;
        player.isNPC = false;
        await em.persistAndFlush(player);
      }

      let opponent = await em.findOne(Player, { name: opponentName });
      if (!opponent) {
        opponent = new Player();
        opponent.name = opponentName;
        opponent.isNPC = opponentName === 'J-Ordi';
        await em.persistAndFlush(opponent);
      }

      gameToUpdate.players.remove(gameToUpdate.players.getItems());
      gameToUpdate.players.add(player, opponent);

      await em.persistAndFlush(gameToUpdate);

      const gameUpdated = await em.findOneOrFail(Game, { id }, { populate: ['players'] });

      return {
        id: gameUpdated.id,
        players: gameUpdated.players.getItems(false).map((player) => ({
          id: player.id,
          name: player.name,
          avatar_path: player.avatar_path,
        })),
      };
    });
  }

  async remove(id: number): Promise<void> {
    const game = await this.em.findOneOrFail(Game, { id });
    await this.em.remove(game).flush();
  }
}
