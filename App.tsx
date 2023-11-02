/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import MainNavigation from './src/routers/MainNavigation';
import {initServices} from './src/services/translate';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {usePushNotification} from '~hooks/usePushNotification';
import {firebase} from '@react-native-firebase/messaging';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import {useLocalStorage} from '~hooks/useLocalStorage';

const RNfirebaseConfig: ReactNativeFirebase.FirebaseAppOptions = {
  projectId: 'hauifocus',
  appId: '1:358486134100:ios:ef9608723dfcb1661d4cc1',
  databaseURL: '',
  apiKey: 'AIzaSyDnS9A6bzaUy8BB4L8n2xvLJ1q3ftJ0ckk',
  messagingSenderId: '358486134100',
  storageBucket: '',
};

function App(): JSX.Element {
  useKeepAwake();
  const isDarkMode = useColorScheme() === 'dark';
  const startApp = useCallback(async () => {
    await firebase.initializeApp(RNfirebaseConfig);
    await initServices();
    await requestUserPermission();
    await getToken();
    StatusBar.setBarStyle('light-content', true);
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  useLocalStorage();

  const {requestUserPermission, getToken} = usePushNotification();

  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
}

export default App;
