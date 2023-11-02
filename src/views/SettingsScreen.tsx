import React from 'react';
import {AnimatedContainer} from '~components/AnimatedContainer';
import {HeaderCustom} from '~components/HeaderCustom';
import {ROUTE_NAMES} from '~utils/constants';
import {StyleSheet} from 'react-native';
import {colors} from '~utils/colors';
import {LanguageSetting} from '~components/setting/LanguageSetting';

export const SettingsScreen = () => {
  return (
    <AnimatedContainer style={styles.container}>
      <HeaderCustom canGoBack title={ROUTE_NAMES.SETTINGS} />
      <LanguageSetting />
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: '100%',
  },
});
