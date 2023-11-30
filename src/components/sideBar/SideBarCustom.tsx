import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '~utils/colors';
import {SideBarItemList} from '~components/sideBar/SideBarItemList';
import ButtonPrimary from '~components/ButtonPrimary';
import {useTranslation} from 'react-i18next';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {storage} from '~services/localStorage';
import {useServiceZustands} from '~zustands/index';
import {StackActions, useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';
import SideBarAccount from './SideBarAccount';

export const SideBarCustom = () => {
  const {t} = useTranslation();
  const {dispatch} = useNavigation();
  const {clearAll} = useServiceZustands();

  const onLogout = () => {
    storage.set('accessToken', '');
    storage.set('userInfo', '');
    clearAll();
    dispatch(StackActions.replace(ROUTE_NAMES.LOGIN));
  };

  return (
    <View style={styles.container}>
      <SideBarAccount />
      <SideBarItemList />
      <ButtonPrimary
        onPress={onLogout}
        text={t('logout')}
        iconRight={faRightFromBracket}
        textStyle={{color: colors.primary, fontSize: 16}}
        style={{
          backgroundColor: colors.white,
          padding: 10,
          marginHorizontal: 30,
          borderRadius: 100,
          justifyContent: 'space-between',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 50,
  },
});
