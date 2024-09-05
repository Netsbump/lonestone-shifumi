import React from 'react';

type GameContainerProps = {
  children?: React.ReactNode;
};

export const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return (
    <div className="rounded-primary bg-container flex min-h-full">
      {children}
    </div>
  );
};
