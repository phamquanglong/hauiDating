import {useEffect, useRef} from 'react';
import {Animated, Keyboard} from 'react-native';
import {GlobalModalType} from '~zustands/useHomeStore';
import {useHomeStore} from '~zustands/index';
import {getPosition} from '~utils/commons';

const useGlobalModalController = () => {
  const globalModal = useHomeStore(state => state.globalModal);
  const {message, visible, yesNoOption, children, position} = globalModal;
  const setGlobalModal = useHomeStore(state => state.setGlobalModal);
  const transformValue = useRef(new Animated.Value(500)).current;

  const animatedView = Animated.timing(transformValue, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (visible) {
      animatedView.start();
    }
    return () => {
      animatedView.reset();
    };
  }, [visible, animatedView]);

  const onShowGlobalModal = (value: GlobalModalType) => {
    setGlobalModal(value);
  };

  const onHideGlobalModal = () => {
    setGlobalModal({
      visible: false,
      yesNoOption: {visible: false},
    });
  };

  return {
    visible,
    message,
    onShowGlobalModal,
    onHideGlobalModal,
    yesNoOption,
    children,
    transformValue,
    position: getPosition(position),
  };
};

export default useGlobalModalController;
