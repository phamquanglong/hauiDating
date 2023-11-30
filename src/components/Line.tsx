import React from 'react';
import {View} from 'react-native';

interface LineProps {
  bgColor: string;
}

const Line = ({bgColor}: LineProps) => {
  return <View style={{height: 1, backgroundColor: bgColor}} />;
};

export default Line;
