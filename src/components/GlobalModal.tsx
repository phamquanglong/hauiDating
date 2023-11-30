import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import ButtonPrimary from './ButtonPrimary';
import {Spacer} from './Spacer';
import {colors} from '~utils/colors';
import useGlobalModalController from '~hooks/useGlobalModalController';
import {useTranslation} from 'react-i18next';

const YesNoOption = (props: {
  value: {
    visible: boolean;
    onYes?: (() => void) | undefined;
    onNo?: (() => void) | undefined;
  };
}) => {
  const {visible, onNo, onYes} = props.value;
  const {t} = useTranslation();
  return visible ? (
    <View style={styles.yesNoOption}>
      <ButtonPrimary
        text={t('home.cancel')}
        onPress={onNo}
        style={[
          {
            backgroundColor: colors.inactive,
          },
          styles.btn,
        ]}
        textStyle={{color: colors.text.black}}
      />
      <Spacer horizontal value={10} />
      <ButtonPrimary
        text={t.do('home.confirm')}
        onPress={onYes}
        style={[
          {
            backgroundColor: colors.primary,
          },
          styles.btn,
        ]}
        textStyle={{color: colors.text.yellow}}
      />
    </View>
  ) : null;
};

const GlobalModal = () => {
  const {
    message,
    visible,
    yesNoOption,
    onHideGlobalModal,
    children,
    transformValue,
    position,
  } = useGlobalModalController();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <TouchableOpacity onPress={onHideGlobalModal} style={styles.overlay} />
        {children ? (
          <Animated.View
            style={[
              position ?? styles.contentCustom,
              {
                transform: [{translateY: transformValue}],
              },
            ]}>
            {children}
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              styles.content,
              {transform: [{translateX: transformValue}]},
            ]}>
            <Text style={styles.title}>{message}</Text>
            <YesNoOption value={yesNoOption} />
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCustom: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    padding: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flex: 1,
  },
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  content: {
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 10,
    minWidth: '80%',
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  yesNoOption: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    color: colors.text.green,
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default GlobalModal;
