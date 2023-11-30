import {images} from './images';
import {ROUTE_NAMES} from '~utils/constants';
import {colors} from '~utils/colors';
import {Position} from '~zustands/useHomeStore';
import {Dimensions, ViewStyle} from 'react-native';
import moment from 'moment';
import notifee from '@notifee/react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const getTimer = (timer: number) => {
  const minute = Math.floor(timer / 60);
  const second = timer - minute * 60;
  const secondStr = second < 10 ? '0' + second : second;
  return minute + ':' + secondStr;
};

export const getImageTree = (
  isPlant: boolean,
  timer: number,
  currentTimer: number,
  tree: Tree,
  isSuccess: boolean | null,
) => {
  const lengthTimer = timer - currentTimer;

  if (isPlant && currentTimer !== 0) {
    if (lengthTimer < timer / 2) {
      return images.ic_sprout;
    } else {
      return images.ic_sapling;
    }
  } else {
    if (isSuccess) {
      return tree.icon;
    } else if (!isSuccess && isSuccess !== null) {
      return images.ic_tree_without_leaves;
    } else {
      return tree.icon;
    }
  }
};

export const getStatusBarColor = (name: string) => {
  switch (name) {
    case ROUTE_NAMES.HOME:
      return colors.primary;
    case ROUTE_NAMES.USERDETAIL:
      return colors.white;
    case '':
      return colors.primary;
    default:
      return colors.primary;
  }
};

export const getPosition: (position?: Position) => ViewStyle | undefined = (
  position?: Position,
) => {
  switch (position) {
    case Position.top:
      return {
        top: 0,
      } as ViewStyle;
    case Position.left:
      return {
        left: 0,
      } as ViewStyle;
    case Position.right:
      return {
        right: 0,
      } as ViewStyle;
    case Position.bottom:
      return {
        bottom: 0,
      } as ViewStyle;
    case Position.center:
      return {
        position: 'absolute',
        backgroundColor: colors.white,
        padding: 10,
        minWidth: '80%',
        borderRadius: 5,
      } as ViewStyle;
    default:
      return;
  }
};

export const validateEmail = (value: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value);
};

export const validatePassword = (value: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(value);
};

export const getAge = (value: string) => {
  return moment().get('year') - moment(value, 'DD/MM/YYYY').get('year');
};

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = (R * c) / 1000.0; // Distance in km
  if (d <= 1) {
    return undefined;
  }
  return `${d.toFixed(0)} km`;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export async function onDisplayNotification(title: string, body: string) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}
