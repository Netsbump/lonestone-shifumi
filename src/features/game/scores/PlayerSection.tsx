import React, { useMemo } from 'react';

import { getPlayerScores } from '../../../lib/utils/game.logic';
import { useGame } from '../useGame';
import { LiveScore } from './LiveScore';
import { PlayerName } from './PlayerName';

type PlayerSectionProps = {
  isOpponent?: boolean;
};

export const PlayerSection: React.FC<PlayerSectionProps> = ({ isOpponent = false }) => {
  const { state } = useGame();
  const { history, players } = state;
  const player = isOpponent ? players.opponent : players.player;

  const { playerScore, opponentScore } = useMemo(() => {
    return getPlayerScores(history);
  }, [history]);

  const score = isOpponent ? opponentScore : playerScore;

  return (
    <div className={`flex ${isOpponent ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
      <div>
        <img
          src={player.avatar.imgPath}
          alt={player.avatar.alt}
          className="w-15 h-15"
        />
      </div>
      <div className="flex flex-col gap-1">
        <PlayerName
          playerName={player.name}
          isOpponent={isOpponent}
        />
        <LiveScore
          scores={score}
          isOpponent={isOpponent}
        />
      </div>
    </div>
  );
};
