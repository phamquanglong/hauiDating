import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
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
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useUserInfo} from '~zustands/useUserInfo';
import {useSocketStore} from '~zustands/useSocketStore';

export const SideBarCustom = (props: DrawerContentComponentProps) => {
  const {t} = useTranslation();
  const {dispatch} = useNavigation();
  const {clearAll} = useServiceZustands();
  const {userInfo} = useUserInfo();
  const {appSocket} = useSocketStore();

  const onLogout = () => {
    storage.set('accessToken', '');
    storage.set('userInfo', '');
    clearAll();
    appSocket?.disconnect();
    dispatch(StackActions.replace(ROUTE_NAMES.LOGIN));
  };

  const alertLogout = () => {
    Alert.alert('', t('logoutConfirm', {account: userInfo?.userName}), [
      {
        text: t('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: t('ok'),
        onPress: onLogout,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SideBarAccount navigation={props.navigation} />
      <SideBarItemList
        navigation={props.navigation}
        state={props.state}
        descriptors={props.descriptors}
      />
      <ButtonPrimary
        onPress={alertLogout}
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
    backgroundColor: colors.white,
    paddingVertical: 50,
  },
});
