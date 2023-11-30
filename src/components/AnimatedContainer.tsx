import React, {ReactNode, useState} from 'react';
import {ViewProps} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import {CustomStatusBar} from '~components/CustomStatusBar';
import {getStatusBarColor} from '~utils/commons';
import {useFocusEffect, useNavigationState} from '@react-navigation/native';

interface AnimatedContainerProps extends ViewProps {
  children: ReactNode;
  entering?: any;
}

export const AnimatedContainer = (props: AnimatedContainerProps) => {
  const [screenName, setSceenName] = useState('');
  const name = useNavigationState(state => state.routes[state.index].name);
  useFocusEffect(
    React.useCallback(() => {
      setSceenName(name);

      return () => setSceenName('');
    }, [name]),
  );

  return (
    <>
      <CustomStatusBar backgroundColor={getStatusBarColor(screenName)} />
      <Animated.View
        {...props}
        entering={props.entering ?? FadeInRight}
        exiting={FadeOutLeft}>
        {props.children}
      </Animated.View>
    </>
  );
};
