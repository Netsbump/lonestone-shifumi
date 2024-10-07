import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import leaf from '../../../assets/images/icon-leaf.svg';
import question from '../../../assets/images/icon-question.svg';
import scissors from '../../../assets/images/icon-scissors.svg';
import stone from '../../../assets/images/icon-stone.svg';
import { choiceTranslation, DRAW, IN_PROGRESS, PLAYER } from '../../../lib/utils/constants';
import { ChoiceCard } from '../../../ui/ChoiceCard';
import { Illustration } from '../../../ui/Illustration';
import { useGame } from '../useGame';
import TimerProgressBar from './TimerProgressBar';

export const RoundResultDisplay: React.FC = () => {
  const { state, nextRound } = useGame();
  const lastRound = state.history[state.history.length - 1];
  const roundStatus = state.roundStatus;

  const playerChoice = lastRound?.playerChoice;
  const opponentChoice = lastRound?.opponentChoice;
  const winnerRound = lastRound?.roundResult;

  //Animations
  const [showOpponentCard, setShowOpponentCard] = useState(false);
  const [moveCards, setMoveCards] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const opponentCardTimer = setTimeout(() => {
      setShowOpponentCard(true);
    }, 1000); // Délai avant l'affichage de la carte de l'adversaire

    const moveCardsTimer = setTimeout(() => {
      setMoveCards(true);
    }, 2000); // Délai avant de déplacer les cartes vers l'extérieur

    const resultTimer = setTimeout(() => {
      setShowResult(true);
    }, 2500); // Délai avant l'affichage du texte du résultat

    return (): void => {
      clearTimeout(opponentCardTimer);
      clearTimeout(moveCardsTimer);
      clearTimeout(resultTimer);
    };
  }, []);

  const textRoundResult: string =
    winnerRound === DRAW ? 'Égalité !' : winnerRound === PLAYER ? 'Gagné !' : 'Perdu !';

  const iconMapping: { [key: string]: string } = {
    leaf: leaf,
    scissors: scissors,
    stone: stone,
    forfeit: question,
  };

  const iconPlayerChoice = playerChoice ? iconMapping[playerChoice.toLocaleLowerCase()] : null;

  const iconOpponentChoice = opponentChoice
    ? iconMapping[opponentChoice.toLocaleLowerCase()]
    : null;

  const lastRoundStatus = roundStatus[roundStatus.length - 1];
  const showProgressBar = lastRoundStatus?.timerProgressBarStatus === IN_PROGRESS;

  const handleProgressComplete = (): void => {
    nextRound();
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
        {playerChoice && (
          <motion.div
            initial={{
              opacity: 0,
              translateX: '-50%',
              rotate: 15,
            }}
            animate={{
              opacity: 1,
              translateX: moveCards ? '-100%' : '-60%',
              rotate: 0,
            }}
            transition={{ duration: 0.5 }}
            className="card player-card absolute"
            style={{ right: '50%', transform: 'translateX(-100%)' }}
          >
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
                <h4 className="mt-5 text-hard-blue">{choiceTranslation[playerChoice]}</h4>
              </div>
            </ChoiceCard>
          </motion.div>
        )}

        {winnerRound && showResult && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute text-light-blue"
            style={{ transform: 'translateX(-50%)', left: '50%' }}
          >
            {textRoundResult}
          </motion.h2>
        )}

        {showOpponentCard && opponentChoice && (
          <motion.div
            initial={{
              opacity: 0,
              translateX: '50%',
              rotate: -15,
            }}
            animate={{
              opacity: 1,
              translateX: moveCards ? '100%' : '60%',
              rotate: 0,
            }}
            transition={{ duration: 0.5 }}
            className="card opponent-card absolute"
            style={{ left: '50%', transform: 'translateX(0%)' }}
          >
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
                <h4 className="mt-5 text-red">{choiceTranslation[opponentChoice]}</h4>
              </div>
            </ChoiceCard>
          </motion.div>
        )}
      </div>

      <div className="flex w-full items-center">
        {showProgressBar && showResult ? (
          <TimerProgressBar onTimerProgressBarEnds={handleProgressComplete} />
        ) : (
          <div className="h-[36px] w-full" />
        )}
      </div>
    </div>
  );
};
