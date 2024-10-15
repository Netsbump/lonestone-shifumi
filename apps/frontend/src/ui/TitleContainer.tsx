import type React from 'react';

type TitleContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const TitleContainer: React.FC<TitleContainerProps> = ({ children, className }) => {
  return (
    <div className="rounded-primary bg-title-container p-2">
      <h5 className={`${className} text-light-blue`}>{children}</h5>
    </div>
  );
};
