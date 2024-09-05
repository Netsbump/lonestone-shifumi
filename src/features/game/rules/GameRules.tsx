import React from 'react';

import leaf from '../../../assets/images/icon-leaf.svg';
import scissors from '../../../assets/images/icon-scissors.svg';
import stone from '../../../assets/images/icon-stone.svg';
import { LEAF, SCISSORS, STONE } from '../../../lib/utils/constants';
import { GameContainer } from '../../../ui/containers/GameContainer';
import { TitleContainer } from '../../../ui/containers/TitleContainer';
import { RuleLine } from './RuleLine';

export const GameRules: React.FC = () => {
  const rules = [
    {
      iconSrc1: stone,
      iconAlt1: STONE,
      iconSrc2: scissors,
      iconAlt2: SCISSORS,
      textRule: 'pierre bat ciseaux',
    },
    {
      iconSrc1: leaf,
      iconAlt1: LEAF,
      iconSrc2: stone,
      iconAlt2: STONE,
      textRule: 'feuille bat pierre',
    },
    {
      iconSrc1: scissors,
      iconAlt1: SCISSORS,
      iconSrc2: leaf,
      iconAlt2: LEAF,
      textRule: 'ciseaux bat feuille',
    },
  ];

  return (
    <GameContainer>
      <div className="flex h-full w-full flex-col gap-9 p-[10px]">
        <TitleContainer>Règles du jeu</TitleContainer>

        <div className="flex flex-col gap-[10px]">
          <ul>
            {rules.map((rule, index) => (
              <li key={index}>
                <RuleLine
                  iconSrc1={rule.iconSrc1}
                  iconAlt1={rule.iconAlt1}
                  iconSrc2={rule.iconSrc2}
                  iconAlt2={rule.iconAlt2}
                  textRule={rule.textRule}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-5">
            <div className="mx-7 border-t-4 border-dark-blue"></div>
            <p className=".Texte-courant text-center text-light-blue">
              Le premier à 5 gagne
            </p>
          </div>
        </div>
      </div>
    </GameContainer>
  );
};
