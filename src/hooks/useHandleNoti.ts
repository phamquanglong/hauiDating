import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {ROUTE_NAMES} from '~utils/constants';
import {Notifier, Easing} from 'react-native-notifier';
import messaging from '@react-native-firebase/messaging';

export const useHandleNoti = () => {
  const {navigate} = useNavigation();
  const navigateToConver = (targetUser: any) => {
    navigate(ROUTE_NAMES.MESSAGESTACK, {
      screen: ROUTE_NAMES.CONVERSATION as never,
      params: {
        targetUser: targetUser,
        isNavFromNoti: true,
      },
    });
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          navigateToConver(
            JSON.parse(detail.notification?.data?.targetUser as string),
          );
          break;
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Notifier.showNotification({
        title: remoteMessage.notification?.title,
        description: remoteMessage.notification?.body,
        duration: 5000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log('Hidden'),
        onPress: () =>
          navigateToConver(
            JSON.parse(remoteMessage.data?.targetUser as string),
          ),
        hideOnPress: false,
      });
    });

    return unsubscribe;
  }, []);
};
