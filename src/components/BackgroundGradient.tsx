import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Gradient from 'react-native-linear-gradient';
import {LinearGradient, Stop} from 'react-native-svg';
import {colors} from '~utils/colors';
import {height} from '~utils/commons';

type BackgroundGradientProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const BackgroundGradient = ({children, style}: BackgroundGradientProps) => {
  return (
    <Gradient
      style={[
        {
          height: height,
        },
        style,
      ]}
      colors={[colors.primary, '#FFF']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.2, 1]}>
      {children}
      <LinearGradient id="path" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
        <Stop offset="1" stopColor={colors.primary} stopOpacity="1" />
      </LinearGradient>
    </Gradient>
  );
};

export default BackgroundGradient;
