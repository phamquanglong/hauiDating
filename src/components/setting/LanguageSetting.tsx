import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useLanguageSettingController} from '~hooks/settings/useLanguageSettingController';
import RNBounceable from '@freakycoder/react-native-bounceable';
export const LanguageSetting = () => {
  const {getCurrentLanguage, changeLanguage} = useLanguageSettingController();

  console.log(getCurrentLanguage());

  return (
    <View style={styles.container}>
      <Text>{getCurrentLanguage()}</Text>
      <RNBounceable>
        <Text onPress={changeLanguage}>Change Language</Text>
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
