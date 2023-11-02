import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimated = () => {
  const transformValue = useRef(new Animated.Value(500)).current;
  const animatedView = Animated.timing(transformValue, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  useEffect(() => {
    animatedView.start();
  }, [animatedView]);

  return {
    transformValue,
  };
};
