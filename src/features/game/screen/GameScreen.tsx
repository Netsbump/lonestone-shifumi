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
//import { ChoiceCard } from '../../../ui/ChoiceCard';
import { GameContainer } from '../../../ui/GameContainer';
//import { Illustration } from '../../../ui/Illustration';
import { useGame } from '../useGame';
import { EndGameDisplay } from './EndGameDisplay';
import { RoundChoices } from './RoundChoices';
import { RoundDisplay } from './RoundDiplay';

export const GameScreen: React.FC = () => {
  const { state } = useGame();
  const { gameStatus, history, players } = state;
  const lastRound = state.history[state.history.length - 1];

  const winnerGameName = useMemo(() => {
    const { playerScore } = getPlayerScores(history);

    if (playerScore === 5) {
      return players.player.name;
    }

    return players.opponent.name;

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
            <EndGameDisplay winnerGameName={winnerGameName} />
          ) : !playerChoice ? ( //Todo changer le nom de la variable playerChoice et remplacer par le composant Timer dynamique
            <h2 className="w-full justify-center text-light-blue">Jouez !</h2>
          ) : (
            <RoundChoices
              playerChoice={playerChoice}
              opponentChoice={opponentChoice}
              iconPlayerChoice={iconPlayerChoice}
              iconOpponentChoice={iconOpponentChoice}
              textRoundResult={textRoundResult}
              choiceTranslation={choiceTranslation}
            />
          )}
        </div>
      </div>
    </GameContainer>
  );
};
