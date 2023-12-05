import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import MainStackNavigator from './MainStackNavigator';
import GlobalModal from '../components/GlobalModal';
import linking from 'linking';
import {useSocketStore} from '~zustands/useSocketStore';
import {SocketService} from '~services/Socket.service';

const MainNavigation = () => {
  const {setListUserOnline, setSocket} = useSocketStore();

  useEffect(() => {
    const appSocket = new SocketService();
    appSocket.connect();
    setSocket(appSocket);
    appSocket.receiveListUserOnline((data: any) => {
      setListUserOnline(data);
    });
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <MainStackNavigator />
      <GlobalModal />
    </NavigationContainer>
  );
};

export default MainNavigation;
