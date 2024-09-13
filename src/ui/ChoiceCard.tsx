import React from 'react';

type ChoiceCardProps = {
  children?: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
};
export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  children,
  outerClassName,
  innerClassName,
}) => {
  return (
    <div
      className={`background rounded-primary border-none ${outerClassName} p-0 shadow focus:outline-none`}
    >
      <div
        className={`front duration-250 block h-[220px] w-[160px] -translate-y-[4px] rounded-primary border-4 bg-white ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
