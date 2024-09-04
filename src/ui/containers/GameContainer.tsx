import React from 'react';

type GameContainerProps = {
  children: React.ReactNode;
};

export const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return (
    <div className="rounded-t-2.5xl min-h-full bg-night-blue">{children}</div>
  );
};
