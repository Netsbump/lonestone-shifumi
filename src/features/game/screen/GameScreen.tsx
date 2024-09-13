import React, { useMemo } from 'react';

import leaf from '../../../assets/images/icon-leaf.svg';
import scissors from '../../../assets/images/icon-scissors.svg';
import stone from '../../../assets/images/icon-stone.svg';
import {
  choiceTranslation,
  DRAW,
  FINISHED,
  PLAYER,
} from '../../../lib/utils/constants';
import { getPlayerScores } from '../../../lib/utils/game.logic';
import { ChoiceCard } from '../../../ui/ChoiceCard';
import { GameContainer } from '../../../ui/GameContainer';
import { Illustration } from '../../../ui/Illustration';
import { useGame } from '../useGame';
import { RoundDisplay } from './RoundDiplay';

export const GameScreen: React.FC = () => {
  const { state } = useGame();
  const { gameStatus, history, players } = state;
  const lastRound = state.history[state.history.length - 1];

  const winnerGameName = useMemo(() => {
    const { playerScore, opponentScore } = getPlayerScores(history);

    if (playerScore === 5) {
      return players.player.name;
    } else if (opponentScore === 5) {
      return players.opponent.name;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

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
  };

  const iconPlayerChoice = playerChoice
    ? iconMapping[playerChoice.toLocaleLowerCase()]
    : null;

  const iconOpponentChoice = opponentChoice
    ? iconMapping[opponentChoice.toLocaleLowerCase()]
    : null;

  return (
    <GameContainer>
      <div className="flex w-full flex-col items-center p-container">
        <RoundDisplay />
        <div className="flex h-full w-full items-center justify-center gap-9">
          {gameStatus === FINISHED ? (
            <div className="flex h-full w-full items-center justify-center gap-9">
              <h2 className="w-full justify-center text-light-blue">
                Fin de la partie
                <br />
                {winnerGameName === 'Moi'
                  ? 'Vous avez'
                  : `${winnerGameName} a`}{' '}
                gagné
              </h2>
            </div>
          ) : !playerChoice ? (
            <h2 className="w-full justify-center text-light-blue">Jouez !</h2>
          ) : (
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
                <ChoiceCard
                  outerClassName="bg-dark-red"
                  innerClassName="border-red"
                >
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
          )}
        </div>
      </div>
    </GameContainer>
  );
};
