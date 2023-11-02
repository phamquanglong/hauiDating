import {firebase} from '@react-native-firebase/messaging';

export const usePushNotification = () => {
  async function requestUserPermission() {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getToken() {
    firebase
      .messaging()
      .hasPermission()
      .then(async enabled => {
        if (enabled) {
          console.log('123', enabled);

          firebase
            .messaging()
            .getToken()
            .then(res => console.log(res))
            .catch(err => console.log(err));
          // const deviceToken = await firebase.messaging().getToken();
          // console.log(deviceToken);
        }
      });
  }

  return {
    requestUserPermission,
    getToken,
  };
};
