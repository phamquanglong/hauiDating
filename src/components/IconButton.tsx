import React, {ReactNode} from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {ViewStyle} from 'react-native';

interface IconButtonProps {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <RNBounceable onPress={props.onPress} style={props.style}>
      {props.children}
    </RNBounceable>
  );
};
