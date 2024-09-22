import React from 'react';

import { OPPONENT, PLAYER } from '../lib/utils/constants';
import { Illustration } from './Illustration';

type IconTextLineProps = {
  iconSrc1: string;
  iconAlt1: string;
  iconSrc2: string;
  iconAlt2: string;
  text: string;
  roundResult?: string;
  className?: string;
};

export const IconTextLine: React.FC<IconTextLineProps> = ({
  iconSrc1,
  iconAlt1,
  iconSrc2,
  iconAlt2,
  text,
  roundResult,
  className,
}) => {
  return (
    <span className={`flex w-full items-center justify-between p-[10px] ${className}`}>
      <Illustration
        src={iconSrc1}
        alt={iconAlt1.toLowerCase()}
        bgColor={roundResult === PLAYER ? 'bg-green' : 'bg-dark-blue'}
        imgSize="15px"
        containerImgClass="h-[30px] w-[30px]"
      />

      <p className="Texte-courant text-light-blue">{text}</p>
      <Illustration
        src={iconSrc2}
        alt={iconAlt2.toLowerCase()}
        bgColor={roundResult === OPPONENT ? 'bg-green' : 'bg-dark-blue'}
        imgSize="15px"
        containerImgClass="h-[30px] w-[30px]"
      />
    </span>
  );
};
