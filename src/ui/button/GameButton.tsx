import React from 'react';
import { Button } from 'react-aria-components';

import { Choice } from '../../lib/types/global';

type GameButtonProps = {
  children: React.ReactNode;
  name: 'start-button' | Choice;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  onPress: (typeButton: 'start-button' | Choice) => void;
};

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  icon,
  onPress,
  isDisabled,
  name,
}) => {
  return (
    <Button
      className="h4 rounded-primary bg-button px-4 py-3 shadow-button-primary"
      onPress={() => onPress(name)}
      isDisabled={isDisabled}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Button>
  );
};
