import {faBox} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Spacer} from './Spacer';
import {colors} from '~utils/colors';

const Empty = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faBox} size={100} color={colors.black_opacity} />
      <Spacer value={10} />
      <Text style={styles.text}>{t('empty')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.black_opacity,
  },
});

export default Empty;
