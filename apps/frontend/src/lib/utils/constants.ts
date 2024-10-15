import leafIcon from '../../assets/images/icon-leaf.svg';
import questionIcon from '../../assets/images/icon-question.svg';
import scissorsIcon from '../../assets/images/icon-scissors.svg';
import stoneIcon from '../../assets/images/icon-stone.svg';
import type { Rules, VisualElements } from '../types/game.types';

export const PLAYER = 'player';
export const OPPONENT = 'opponent';
export const DRAW = 'draw';

export const LEAF = 'LEAF';
export const STONE = 'STONE';
export const SCISSORS = 'SCISSORS';
export const FORFEIT = 'FORFEIT';

export const STONE_TEXT = 'Pierre !';
export const LEAF_TEXT = 'Feuille !';
export const SCISSORS_TEXT = 'Ciseaux !';

export const NOT_STARTED = 'NOT_STARTED';
export const IN_PROGRESS = 'IN_PROGRESS';
export const FINISHED = 'FINISHED';

export const choiceTranslation: { [key: string]: string } = {
  LEAF: 'Feuille',
  STONE: 'Pierre',
  SCISSORS: 'Ciseaux',
  FORFEIT: 'Forfait',
};

export const SHIFUMI_RULES: Rules = {
  [LEAF]: {
    beat: STONE,
  },
  [STONE]: {
    beat: SCISSORS,
  },
  [SCISSORS]: {
    beat: LEAF,
  },
  [FORFEIT]: {
    beat: FORFEIT, // Un forfeit ne bat personne
  },
};

export const VISUAL_ELEMENTS: VisualElements = {
  [LEAF]: {
    iconSrc: leafIcon,
    iconAlt: 'Feuille',
    text: 'feuille',
  },
  [STONE]: {
    iconSrc: stoneIcon,
    iconAlt: 'Pierre',
    text: 'pierre',
  },
  [SCISSORS]: {
    iconSrc: scissorsIcon,
    iconAlt: 'Ciseaux',
    text: 'ciseaux',
  },
  [FORFEIT]: {
    iconSrc: questionIcon,
    iconAlt: 'Forfait',
    text: 'forfait',
  },
};
