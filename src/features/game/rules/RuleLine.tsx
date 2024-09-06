import React from 'react';

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
    <span className="flex w-full justify-between p-[10px]">
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-dark-blue">
        <img
          src={iconSrc1}
          alt={iconAlt1.toLowerCase()}
          width="15px"
          height="15px"
          className="invert"
        />
      </div>
      <p className="Texte-courant text-light-blue">{textRule}</p>
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-dark-blue">
        <img
          src={iconSrc2}
          alt={iconAlt2.toLowerCase()}
          width="15px"
          height="15px"
          className="invert"
        />
      </div>
    </span>
  );
};
