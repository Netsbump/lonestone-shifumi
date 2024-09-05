import React from 'react';

type TitleContainerProps = {
  children: React.ReactNode;
};

export const TitleContainer: React.FC<TitleContainerProps> = ({ children }) => {
  return (
    <div className="rounded-t-2.5xl bg-night-blue p-2">
      <h5 className="text-light-blue">{children}</h5>
    </div>
  );
};
