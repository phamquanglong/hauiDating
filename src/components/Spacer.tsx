import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  horizontal: boolean;
  value: number;
}

export const Spacer = (props: SpacerProps) => {
  return (
    <View
      style={{
        height: !props.horizontal ? props.value : undefined,
        width: props.horizontal ? props.value : undefined,
      }}
    />
  );
};
