import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCoins} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';
import useHomeStore from '~zustands/useHomeStore';

export const CoinNumber = () => {
  const {coins} = useHomeStore();
  return (
    <View>
      <FontAwesomeIcon
        icon={faCoins}
        color={colors.bg_yellow}
        size={25}
        style={styles.coin}
      />
      <View
        style={{
          borderRadius: 100,
          overflow: 'hidden',
        }}>
        <Text style={styles.text}>{coins}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text.yellow,
    backgroundColor: colors.bg_opacity,
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  coin: {
    position: 'absolute',
    zIndex: 1,
    left: -12,
  },
});
