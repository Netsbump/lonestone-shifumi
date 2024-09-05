import React from 'react';
import { Button } from 'react-aria-components';

type GameButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
};

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  icon,
  onPress,
  isDisabled,
}) => {
  return (
    <Button
      className="h4 rounded-primary shadow-button-primary bg-button px-4 py-3"
      onPress={onPress}
      isDisabled={isDisabled}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Button>
  );
};
