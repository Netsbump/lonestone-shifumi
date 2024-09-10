import React, { useMemo } from 'react';

import humanPlayer from '../../../assets/images/avatar-human.svg';
import npcPlayer from '../../../assets/images/avatar-robot.svg';
import { OPPONENT, PLAYER } from '../../../lib/utils/constants';
import { useGame } from '../useGame';
import { PlayerSection } from './PlayerSection';

export const PlayerScores: React.FC = () => {
  const { state } = useGame();
  const history = state.history;

  const { playerScore, opponentScore } = useMemo(() => {
    const playerWins = history.filter(
      (round) => round.roundResult === PLAYER,
    ).length;

    const opponentWins = history.filter(
      (round) => round.roundResult === OPPONENT,
    ).length;

    return {
      playerScore: playerWins,
      opponentScore: opponentWins,
    };
  }, [history]);
  return (
    <div className="flex w-full justify-between">
      <PlayerSection
        playerName="Moi"
        avatar={humanPlayer}
        altAvatar="avatar human player"
        scores={playerScore}
        isOpponent={false}
      />
      <PlayerSection
        playerName="J-Ordi"
        avatar={npcPlayer}
        altAvatar="avatar npc player"
        scores={opponentScore}
        isOpponent
      />
    </div>
  );
};
