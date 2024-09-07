import React from 'react';

import { Illustration } from '../../../ui/Illustration';

type RuleLineProps = {
  iconSrc1: string;
  iconAlt1: string;
  iconSrc2: string;
  iconAlt2: string;
  textRule: string;
};

export const RuleLine: React.FC<RuleLineProps> = ({
  iconSrc1,
  iconAlt1,
  iconSrc2,
  iconAlt2,
  textRule,
}) => {
  return (
    <span className="flex w-full items-center justify-between p-[10px]">
      <Illustration
        src={iconSrc1}
        alt={iconAlt1.toLowerCase()}
        bgColor="bg-dark-blue"
        imgSize="15px"
        containerImgClass="h-[30px] w-[30px]"
      />

      <p className="Texte-courant text-light-blue">{textRule}</p>
      <Illustration
        src={iconSrc2}
        alt={iconAlt2.toLowerCase()}
        bgColor="bg-dark-blue"
        imgSize="15px"
        containerImgClass="h-[30px] w-[30px]"
      />
    </span>
  );
};
