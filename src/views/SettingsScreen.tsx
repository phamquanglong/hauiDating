import React from 'react';
import {AnimatedContainer} from '~components/AnimatedContainer';
import {HeaderCustom} from '~components/HeaderCustom';
import {StyleSheet} from 'react-native';
import {colors} from '~utils/colors';
import {LanguageSetting} from '~components/setting/LanguageSetting';
import {useTranslation} from 'react-i18next';

export const SettingsScreen = () => {
  const {t} = useTranslation();
  return (
    <AnimatedContainer style={styles.container}>
      <HeaderCustom canGoBack={false} title={t('drawer.setting')} />
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
