import {firebase} from '@react-native-firebase/messaging';
import UserApi from '~apis/user.api';

export const usePushNotification = () => {
  async function requestUserPermission() {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }

  async function getToken() {
    try {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        UserApi.postNotificationToken({token: fcmToken}).then(() =>
          console.log('Your Token : ', fcmToken),
        );
      }
    } catch (error) {
      console.log({error});
    }
  }

  return {
    requestUserPermission,
    getToken,
  };
};
