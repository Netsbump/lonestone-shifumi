import React from 'react';
import { Button, ButtonProps } from 'react-aria-components';

type GameButtonProps = ButtonProps & {
  children: React.ReactNode;
  className?: string;
};

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className="pushable group cursor-pointer rounded-primary border-none bg-hard-blue p-0 focus:outline-none"
    >
      <span
        className={`front duration-250 Text-button block h-[90px] -translate-y-[8px] rounded-primary bg-button text-white transition-transform ease-in-out will-change-transform group-hover:translate-y-[-12px] group-data-[pressed]:translate-y-[-4px] ${className}`}
      >
        {children}
      </span>
    </Button>
  );
};
