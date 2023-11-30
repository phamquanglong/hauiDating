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
    try {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('Your Token : ', fcmToken);
      }
    } catch (error) {
      console.log({error});
    }
    // const deviceToken = await firebase.messaging().getToken();
    // console.log('deviceToken', deviceToken);
    // firebase
    //   .messaging()
    //   .hasPermission()
    //   .then(async enabled => {
    //     if (enabled) {
    //       console.log('123', enabled);

    //       firebase
    //         .messaging()
    //         .getToken()
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    //     }
    //   });
  }

  return {
    requestUserPermission,
    getToken,
  };
};
