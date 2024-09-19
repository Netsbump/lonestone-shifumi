import React from 'react';

import leaf from '../../../assets/images/icon-leaf.svg';
import question from '../../../assets/images/icon-question.svg';
import scissors from '../../../assets/images/icon-scissors.svg';
import stone from '../../../assets/images/icon-stone.svg';
import { choiceTranslation, DRAW, PLAYER } from '../../../lib/utils/constants';
import { ChoiceCard } from '../../../ui/ChoiceCard';
import { Illustration } from '../../../ui/Illustration';
import { useGame } from '../useGame';
import TimerProgressBar from './TimerProgressBar';

type RoundResultDisplayProps = {
  onProgressComplete: () => void;
};

export const RoundResultDisplay: React.FC<RoundResultDisplayProps> = ({
  onProgressComplete,
}) => {
  const { state } = useGame();
  const lastRound = state.history[state.history.length - 1];

  const playerChoice = lastRound?.playerChoice;
  const opponentChoice = lastRound?.opponentChoice;
  const winnerRound = lastRound?.roundResult;

  const textRoundResult: string =
    winnerRound === DRAW
      ? 'Égalité !'
      : winnerRound === PLAYER
        ? 'Gagné !'
        : 'Perdu !';

  const iconMapping: { [key: string]: string } = {
    leaf: leaf,
    scissors: scissors,
    stone: stone,
    forfeit: question,
  };

  const iconPlayerChoice = playerChoice
    ? iconMapping[playerChoice.toLocaleLowerCase()]
    : null;

  const iconOpponentChoice = opponentChoice
    ? iconMapping[opponentChoice.toLocaleLowerCase()]
    : null;

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-around">
        {playerChoice && (
          <ChoiceCard
            outerClassName="bg-hard-blue"
            innerClassName="border-electric-blue"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <Illustration
                src={iconPlayerChoice || ''}
                alt={playerChoice.toLowerCase()}
                bgColor="bg-hard-blue"
                imgSize="50px"
                containerImgClass="h-[100px] w-[100px]"
              />
              <h4 className="mt-5 text-hard-blue">
                {choiceTranslation[playerChoice]}
              </h4>
            </div>
          </ChoiceCard>
        )}
        {winnerRound && <h2 className="text-light-blue">{textRoundResult}</h2>}
        {opponentChoice && (
          <ChoiceCard outerClassName="bg-dark-red" innerClassName="border-red">
            <div className="flex h-full flex-col items-center justify-center">
              <Illustration
                src={iconOpponentChoice || ''}
                alt={opponentChoice.toLowerCase()}
                bgColor="bg-red"
                imgSize="50px"
                containerImgClass="h-[100px] w-[100px]"
              />
              <h4 className="mt-5 text-red">
                {choiceTranslation[opponentChoice]}
              </h4>
            </div>
          </ChoiceCard>
        )}
      </div>
      {/* Barre de progression */}
      <div className="flex w-full items-center">
        <TimerProgressBar onTimerProgressBarEnds={onProgressComplete} />
      </div>
    </div>
  );
};
