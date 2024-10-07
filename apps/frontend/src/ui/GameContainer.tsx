import React from 'react';

type GameContainerProps = {
  children?: React.ReactNode;
};

export const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return <div className="flex min-h-full rounded-primary bg-container">{children}</div>;
};
