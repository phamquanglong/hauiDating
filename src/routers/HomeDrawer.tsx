import React, {useEffect} from 'react';
import {SideBarCustom} from '~components/sideBar/SideBarCustom';
import {HomeStack} from './HomeStack';
import {SettingsStack} from './SettingsStack';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ROUTE_NAMES} from '~utils/constants';
import {HistoryStack} from './HistoryStack';
import {MessageStack} from './MessageStack';
import {useSocketStore} from '~zustands/useSocketStore';
import {SocketService} from '~services/Socket.service';
import {ActionInitSocket} from '~reducers/socket.reducer';
import {useAppDispatch} from '~hooks/useAppDispatch';
import EditInfoScreen from '~views/EditInfoScreen';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
};

export const HomeDrawer = () => {
  const {setSocket} = useSocketStore();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const appSocket = new SocketService();
    appSocket.connect();
    setSocket(appSocket);
    dispatch(ActionInitSocket(appSocket));
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={SideBarCustom}>
      <Drawer.Screen name={ROUTE_NAMES.HOMESTACK} component={HomeStack} />
      <Drawer.Screen
        name={ROUTE_NAMES.SETTINGSSTACK}
        component={SettingsStack}
      />
      <Drawer.Screen name={ROUTE_NAMES.HISTORYSTACK} component={HistoryStack} />
      <Drawer.Screen name={ROUTE_NAMES.MESSAGESTACK} component={MessageStack} />
      <Drawer.Screen
        name={ROUTE_NAMES.EDITINFOSCREEN}
        component={EditInfoScreen}
      />
    </Drawer.Navigator>
  );
};
