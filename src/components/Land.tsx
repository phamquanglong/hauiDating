import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';

const Land = () => {
  return (
    <View style={styles.land}>
      <View style={styles.top} />
      <View style={styles.bottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  land: {
    position: 'absolute',
    bottom: 20,
    zIndex: -20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  top: {
    position: 'absolute',
    height: 200,
    backgroundColor: colors.primary,
    width: '100%',
    zIndex: -9,
    top: 0,
  },
  bottom: {
    backgroundColor: colors.home.land,
    height: 230,
    width: 230,
    borderRadius: 150,
    zIndex: -10,
  },
});

export default Land;
