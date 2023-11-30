import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {colors} from '~utils/colors';
import {height, width} from '~utils/commons';

const AppLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    // backgroundColor: colors.black_opacity,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: width,
    position: 'absolute',
  },
});

export default AppLoading;
