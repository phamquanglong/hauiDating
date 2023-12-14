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
import {useHandleNoti} from '~hooks/useHandleNoti';
import {useSocketStore} from '~zustands/useSocketStore';
import {SocketService} from '~services/Socket.service';
import {usePushNotification} from '~hooks/usePushNotification';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
};

export const HomeDrawer = () => {
  useHandleNoti();

  const {setListUserOnline, setSocket} = useSocketStore();
  const {getToken} = usePushNotification();

  useEffect(() => {
    const appSocket = new SocketService();
    appSocket.connect();
    setSocket(appSocket);
    getToken();
    appSocket.receiveListUserOnline((data: any) => {
      setListUserOnline(data);
    });
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
    </Drawer.Navigator>
  );
};
