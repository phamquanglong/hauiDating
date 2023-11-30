import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTE_NAMES} from '~utils/constants';
import LoginScreen from '~views/LoginScreen';
import RegisterScreen from '~views/RegisterScreen';
import StartUpCarousel from '~views/StartUpCarousel';
import {HomeDrawer} from './HomeDrawer';
import {storage} from '~services/localStorage';
import SetupProfile from '~views/SetupProfile';
import UserDetail from '~views/UserDetail';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const MainStackNavigator = () => {
  const getInitRoute = () => {
    if (storage.getBoolean('firstLaunch') === undefined) {
      return ROUTE_NAMES.STARTUPCAROUSEL;
    }
    if (
      (!storage.getString('userInfo') ||
        !JSON.parse(storage.getString('userInfo') ?? '').profile) &&
      (storage.getString('accessToken')?.length ?? 0) > 0
    ) {
      return ROUTE_NAMES.SETUPPROFILE;
    } else if (
      (storage.getString('userInfo')?.length ?? 0) > 0 &&
      JSON.parse(storage.getString('userInfo') ?? '').profile &&
      storage.getString('accessToken') &&
      storage.getString('accessToken')?.length !== 0
    ) {
      return ROUTE_NAMES.HOMEDRAWER;
    } else {
      return ROUTE_NAMES.LOGIN;
    }
  };
  return (
    <Stack.Navigator
      initialRouteName={getInitRoute()}
      screenOptions={screenOptions}>
      <Stack.Screen name={ROUTE_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTE_NAMES.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={ROUTE_NAMES.STARTUPCAROUSEL}
        component={StartUpCarousel}
      />
      <Stack.Screen name={ROUTE_NAMES.HOMEDRAWER} component={HomeDrawer} />
      <Stack.Screen name={ROUTE_NAMES.SETUPPROFILE} component={SetupProfile} />
      <Stack.Screen name={ROUTE_NAMES.USERDETAIL} component={UserDetail} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
