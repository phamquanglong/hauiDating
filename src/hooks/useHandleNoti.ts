import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {ROUTE_NAMES} from '~utils/constants';

export const useHandleNoti = () => {
  const {navigate} = useNavigation();
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          navigate(ROUTE_NAMES.CONVERSATION as never, {
            targetUser: detail.notification?.data?.targetUser,
          });
          break;
      }
    });
  }, []);
};
