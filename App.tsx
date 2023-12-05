/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';

import MainNavigation from './src/routers/MainNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {usePushNotification} from '~hooks/usePushNotification';
import {firebase} from '@react-native-firebase/messaging';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import {useLocalStorage} from '~hooks/useLocalStorage';
import {ToastProvider} from 'react-native-toast-notifications';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// LogBox.ignoreAllLogs();

const RNfirebaseConfig: ReactNativeFirebase.FirebaseAppOptions = {
  projectId: 'hauifocus',
  appId: '1:358486134100:ios:ef9608723dfcb1661d4cc1',
  databaseURL: '',
  apiKey: 'AIzaSyDnS9A6bzaUy8BB4L8n2xvLJ1q3ftJ0ckk',
  messagingSenderId: '358486134100',
  storageBucket: '',
};

firebase.initializeApp(RNfirebaseConfig);

function App(): JSX.Element {
  useKeepAwake();
  const {requestUserPermission, getToken} = usePushNotification();

  async function requestPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }

  const startApp = useCallback(async () => {
    await requestPermission();
    requestUserPermission();
    getToken();
    StatusBar.setBarStyle('light-content', true);
  }, [getToken, requestUserPermission]);

  useEffect(() => {
    startApp();
  }, [startApp]);

  useLocalStorage();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <MainNavigation />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

export default App;
