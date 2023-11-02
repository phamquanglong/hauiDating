import React from 'react';
import {ROUTE_NAMES} from '../utils/constants';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {SideBarCustom} from '~components/sideBar/SideBarCustom';
import {HomeStack} from './HomeStack';
import {SettingsStack} from './SettingsStack';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
};

const MainStackNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      screenOptions={screenOptions}
      drawerContent={SideBarCustom}>
      <Drawer.Screen name={ROUTE_NAMES.HOMESTACK} component={HomeStack} />
      <Drawer.Screen
        name={ROUTE_NAMES.SETTINGSSTACK}
        component={SettingsStack}
      />
    </Drawer.Navigator>
  );
};

export default MainStackNavigator;
