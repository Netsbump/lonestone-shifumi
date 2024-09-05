import React from 'react';

type GameContainerProps = {
  children?: React.ReactNode;
};

export const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return (
    <div className="flex min-h-full rounded-t-2.5xl bg-night-blue-medium">
      {children}
    </div>
  );
};
