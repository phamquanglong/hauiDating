import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  horizontal?: boolean;
  value?: number;
  flex?: number;
}

export const Spacer = (props: SpacerProps) => {
  return (
    <View
      style={{
        flex: props.flex,
        height: !props.horizontal ? props.value : undefined,
        width: props.horizontal ? props.value : undefined,
      }}
    />
  );
};
