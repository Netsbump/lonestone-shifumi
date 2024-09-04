import React from 'react';

import leaf from '../../../../../assets/images/icon-leaf.svg';
import scissors from '../../../../../assets/images/icon-scissors.svg';
import stone from '../../../../../assets/images/icon-stone.svg';
import { LEAF, SCISSORS, STONE } from '../../../../../lib/utils/constants';
import { GameContainer } from '../../../../../ui/containers/GameContainer';

export const GameRules: React.FC = () => {
  return (
    <GameContainer>
      <h5>Règles du jeu</h5>
      <ul>
        <li>
          <span>
            <img src={stone} alt={STONE.toLowerCase()} />
            <p>pierre bat ciseaux</p>
            <img src={scissors} alt={SCISSORS.toLowerCase()} />
          </span>
        </li>
        <li>
          <span>
            <img src={leaf} alt={LEAF.toLowerCase()} />
            <p>feuille bat pierre</p>
            <img src={stone} alt={STONE.toLowerCase()} />
          </span>
        </li>
        <li>
          <span>
            <img src={scissors} alt={SCISSORS.toLowerCase()} />
            <p>ciseaux bat feuille</p>
            <img src={leaf} alt={LEAF.toLowerCase()} />
          </span>
        </li>
      </ul>
      <hr />
      <p>Le premier à 5 gagne</p>
    </GameContainer>
  );
};
