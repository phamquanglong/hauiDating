import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useHomeStore} from '~zustands/index';
import useCountdown from '~hooks/useCountdown';
import {getTimer} from '~utils/commons';
import {colors} from '~utils/colors';
import {ShareViewShot} from '~components/ShareViewShot';
import {useTranslation} from 'react-i18next';

interface HomeBottomProps {
  onHandleHomeBtn: () => void;
  isPlant: boolean;
}

const HomeBottom = (props: HomeBottomProps) => {
  const {onHandleHomeBtn, isPlant} = props;
  const timer = useHomeStore(state => state.timer);
  const isSuccess = useHomeStore(state => state.isSuccess);
  const countdown = useCountdown(timer * 60);
  const {t} = useTranslation();
  const isDisabled = timer === 0;

  if (isSuccess !== null) {
    return (
      <View style={styles.buttonContainer}>
        <View />
        <ShareViewShot />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {isPlant ? countdown : getTimer(timer * 60)}
      </Text>
      <RNBounceable
        onPress={onHandleHomeBtn}
        style={[
          styles.button,
          {
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        disabled={isDisabled}>
        <Text style={styles.textBtn}>
          {t(isPlant ? 'home.give_up' : 'home.plant')}
        </Text>
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.home.slider,
    borderRadius: 5,
    padding: 10,
    elevation: 10,
    minWidth: '40%',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 20,
    color: colors.text.white,
  },
  timer: {
    fontSize: 70,
    fontWeight: 'bold',
    fontFamily: 'blackopsone_regular',
    color: colors.text.green,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default HomeBottom;
