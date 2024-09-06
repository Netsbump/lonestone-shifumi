import React, { useState } from 'react';

import { Choice, Round } from '../../lib/types/global';
import {
  DRAW,
  LEAF,
  LEAF_TEXT,
  SCISSORS,
  SCISSORS_TEXT,
  STONE,
  STONE_TEXT,
} from '../../lib/utils/constants';
import {
  determineRoundResult,
  getRandomChoice,
} from '../../lib/utils/gameLogic';
import { GameButton } from '../../ui/button/GameButton';
import { GameHistory } from './history/GameHistory';
import { GameRules } from './rules/GameRules';
import { PlayerScores } from './scores/PlayerScores';
import { GameScreen } from './screen/GameScreen';

type GameProps = {
  startGame: boolean;
};

export const Game: React.FC<GameProps> = ({ startGame }) => {
  const [rounds, setRounds] = useState<number>(0);
  const [history, setHistory] = useState<Round[]>([]);
  // const [score, setScores] = useState<null | number>(null);

  const handlePlayerChoice = (playerChoice: Choice): void => {
    console.log(playerChoice);

    //Todo getOpponentChoice (V1: Npc)
    const opponentChoice = getRandomChoice();

    //Display choices
    console.log(
      `(Player choice) ${playerChoice} VS ${opponentChoice} (Opponent Choice)`,
    );

    //Call determineWinner(playerChoice, OpponentChoice);
    const roundResult = determineRoundResult(playerChoice, opponentChoice);

    //Display result
    if (roundResult !== DRAW) {
      console.log(`Player ${roundResult}`);
    } else {
      console.log(`It's ${roundResult}`);
    }

    //Update scores

    //Update history
    setHistory([{ playerChoice, opponentChoice, roundResult }]);

    //Update rounds
    setRounds((prev) => prev + 1);

    //Check if winner (one playerScore === 5)
    //Next round or endgame + display final result
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
          <GameScreen round={rounds} />
        </div>
        <aside className="col-span-1">
          <GameHistory roundsHistory={history} />
        </aside>
      </div>

      {startGame && (
        <div className="col-span-3 col-start-2 flex items-center justify-center">
          <GameButton onPress={() => handlePlayerChoice(STONE)}>
            {STONE_TEXT}
          </GameButton>
          <GameButton onPress={() => handlePlayerChoice(LEAF)}>
            {LEAF_TEXT}
          </GameButton>
          <GameButton onPress={() => handlePlayerChoice(SCISSORS)}>
            {SCISSORS_TEXT}
          </GameButton>
        </div>
      )}
    </main>
  );
};
