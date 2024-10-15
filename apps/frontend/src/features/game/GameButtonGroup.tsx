import type React from 'react';

import type { Choice } from '../../lib/types/game.types';
import {
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
import { useGame } from './useGame';

const leaf = '/images/icon-leaf.svg';
const scissors = '/images/icon-scissors.svg';
const stone = '/images/icon-stone.svg';

type GameButtonGroupProps = {
  onPlayerChoice: (playerChoice: Choice) => void;
};

export const GameButtonGroup: React.FC<GameButtonGroupProps> = ({
  onPlayerChoice,
}) => {
  const { state } = useGame();
  const history =
    state.history.length > 0 ? state.history[state.history.length - 1] : null;
  const lastRoundStatus = state.roundStatus[state.roundStatus.length - 1];
  const isDisabled = lastRoundStatus?.timerProgressBarStatus === IN_PROGRESS;

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <GameButton
        onPress={() => onPlayerChoice(STONE)}
        className={'w-56'}
        isDisabled={isDisabled}
        isSelected={history?.playerChoice === STONE}
        aria-pressed={history?.playerChoice === STONE}
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
        onPress={() => onPlayerChoice(LEAF)}
        className={'w-56'}
        isDisabled={isDisabled}
        isSelected={history?.playerChoice === LEAF}
        aria-pressed={history?.playerChoice === LEAF}
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
        onPress={() => onPlayerChoice(SCISSORS)}
        className={'w-56'}
        isDisabled={isDisabled}
        isSelected={history?.playerChoice === SCISSORS}
        aria-pressed={history?.playerChoice === SCISSORS}
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
  );
};
