import React from 'react';

import { ChoiceCard } from '../../../ui/ChoiceCard';
import { Illustration } from '../../../ui/Illustration';

type RoundChoicesProps = {
  playerChoice: string | null;
  opponentChoice: string | null;
  iconPlayerChoice: string | null;
  iconOpponentChoice: string | null;
  textRoundResult: string;
  choiceTranslation: { [key: string]: string };
};

export const RoundChoices: React.FC<RoundChoicesProps> = ({
  playerChoice,
  opponentChoice,
  iconPlayerChoice,
  iconOpponentChoice,
  textRoundResult,
  choiceTranslation,
}) => {
  return (
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
      {playerChoice && opponentChoice && (
        <h2 className="text-light-blue">{textRoundResult}</h2>
      )}
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
  );
};
