import React from 'react';

import leaf from '../../assets/images/icon-leaf.svg';
import scissors from '../../assets/images/icon-scissors.svg';
import stone from '../../assets/images/icon-stone.svg';
import { Choice } from '../../lib/types/game.types';
import {
  FINISHED,
  IN_PROGRESS,
  LEAF,
  LEAF_TEXT,
  SCISSORS,
  SCISSORS_TEXT,
  STONE,
  STONE_TEXT,
} from '../../lib/utils/constants';
import { GameButton } from '../../ui/GameButton';
import { Illustration } from '../../ui/Illustration';
import { GameHistory } from './history/GameHistory';
import { GameRules } from './rules/GameRules';
import { PlayerScores } from './scores/PlayerScores';
import { GameScreen } from './screen/GameScreen';
import { useGame } from './useGame';

export const Game: React.FC = () => {
  const { state, play, reset } = useGame();
  const gameStatus = state.gameStatus;

  const handlePlayerChoice = (playerChoice: Choice): void => {
    play(playerChoice);
  };

  const handleResetGame = (): void => {
    reset();
  };

  return (
    <main className="grid grid-cols-5 grid-rows-[auto,minmax(420px,1fr),auto] gap-4">
      <div className="col-span-3 col-start-2 flex">
        <PlayerScores />
      </div>

      <div className="col-span-5 grid grid-cols-5 gap-5">
        <aside className="col-span-1">
          <GameRules />
        </aside>
        <div className="col-span-3">
          <GameScreen />
        </div>
        <aside className="col-span-1">
          <GameHistory />
        </aside>
      </div>

      {gameStatus === IN_PROGRESS && (
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButton
            onPress={() => handlePlayerChoice(STONE)}
            className={'w-56'}
          >
            <span className="flex h-full items-center justify-center gap-2">
              <Illustration
                src={stone}
                alt={STONE}
                bgColor="bg-hard-blue"
                imgSize="30px"
                containerImgClass="h-[60px] w-[60px]"
              />
              {STONE_TEXT}
            </span>
          </GameButton>
          <GameButton
            onPress={() => handlePlayerChoice(LEAF)}
            className={'w-56'}
          >
            <span className="flex h-full items-center justify-center gap-2">
              <Illustration
                src={leaf}
                alt={LEAF}
                bgColor="bg-hard-blue"
                imgSize="30px"
                containerImgClass="h-[60px] w-[60px]"
              />
              {LEAF_TEXT}
            </span>
          </GameButton>
          <GameButton
            onPress={() => handlePlayerChoice(SCISSORS)}
            className={'w-56'}
          >
            <span className="flex h-full items-center justify-center gap-2">
              <Illustration
                src={scissors}
                alt={SCISSORS}
                bgColor="bg-hard-blue"
                imgSize="30px"
                containerImgClass="h-[60px] w-[60px]"
              />
              {SCISSORS_TEXT}
            </span>
          </GameButton>
        </div>
      )}

      {gameStatus === FINISHED && (
        <div className="col-span-3 col-start-2 mt-5 flex items-center justify-center gap-3">
          <GameButton
            onPress={handleResetGame}
            className={'flex w-72 items-center justify-center'}
          >
            Rejouez
          </GameButton>
        </div>
      )}
    </main>
  );
};
