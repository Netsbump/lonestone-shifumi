import type React from 'react';

import type { Result } from '../../../lib/types/game.types';
import { getRuleInfo } from '../../../lib/utils/game.logic';
import { GameContainer } from '../../../ui/GameContainer';
import { IconTextLine } from '../../../ui/IconTextLine';
import { TitleContainer } from '../../../ui/TitleContainer';
import { useGame } from '../useGame';

export const GameHistory: React.FC = () => {
  const { state } = useGame();
  const history = state.history;

  const getResultText = (
    playerChoice: string,
    opponentChoice: string,
    roundResult: Result,
  ): string => {
    if (roundResult === 'draw') {
      return 'égalité !';
    }
    
    if (roundResult === 'player') {
      return `${playerChoice} bat ${opponentChoice}`;
    }

    return `${opponentChoice} bat ${playerChoice}`;
  };

  return (
    <GameContainer>
      <div className="flex h-full w-full flex-col gap-2 p-container">
        <TitleContainer>Historique des coups</TitleContainer>
        <div className="flex h-[350px] flex-col-reverse overflow-y-auto">
          <ul>
            {history.map((round, index) => {
              const playerInfo = getRuleInfo(round.playerChoice);
              const opponentInfo = getRuleInfo(round.opponentChoice);

              return (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="pb-2"
                >
                  <IconTextLine
                    className="bg-night-blue"
                    iconSrc1={playerInfo.iconSrc}
                    iconAlt1={playerInfo.iconAlt}
                    iconSrc2={opponentInfo.iconSrc}
                    iconAlt2={opponentInfo.iconAlt}
                    text={getResultText(playerInfo.text, opponentInfo.text, round.roundResult)}
                    roundResult={round.roundResult}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </GameContainer>
  );
};
