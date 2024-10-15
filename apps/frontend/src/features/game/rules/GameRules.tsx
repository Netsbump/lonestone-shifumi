import type React from 'react';

import type { Choice } from '../../../lib/types/game.types';
import { LEAF, SCISSORS, STONE } from '../../../lib/utils/constants';
import { getRuleInfo } from '../../../lib/utils/game.logic';
import { GameContainer } from '../../../ui/GameContainer';
import { IconTextLine } from '../../../ui/IconTextLine';
import { TitleContainer } from '../../../ui/TitleContainer';

export const GameRules: React.FC = () => {
  const choices: Choice[] = [LEAF, SCISSORS, STONE];
  const ruleInfo = choices.map((choice) => getRuleInfo(choice));

  return (
    <GameContainer>
      <div className="flex h-full w-full flex-col gap-9 p-container">
        <TitleContainer>Règles du jeu</TitleContainer>

        <div className="flex flex-col gap-[10px]">
          <ul>
            {ruleInfo.map((rule, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index}>
                <IconTextLine
                  iconSrc1={rule.iconSrc}
                  iconAlt1={rule.iconAlt}
                  iconSrc2={getRuleInfo(rule.beat).iconSrc}
                  iconAlt2={getRuleInfo(rule.beat).iconAlt}
                  text={`${rule.text} bat ${getRuleInfo(rule.beat).text}`}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-5">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="mx-7 border-t-4 border-dark-blue"></div>
            <p className="Texte-courant text-center text-light-blue">
              Le premier à 5 gagne
            </p>
          </div>
        </div>
      </div>
    </GameContainer>
  );
};
