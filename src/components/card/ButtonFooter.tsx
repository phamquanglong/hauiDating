import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconButton} from '~components/IconButton';

interface ButtonFooterProps {
  icon: any;
  color: string;
  onPress?: () => void;
}

const ButtonFooter = ({icon, color, onPress}: ButtonFooterProps) => {
  return (
    <IconButton
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: color,
        padding: 15,
        borderRadius: 100,
      }}>
      <FontAwesomeIcon icon={icon} color={color} size={25} />
    </IconButton>
  );
};

export default ButtonFooter;
