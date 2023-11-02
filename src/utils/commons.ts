import {images} from './images';
import {ROUTE_NAMES} from '~utils/constants';
import {colors} from '~utils/colors';
import {Position} from '~zustands/useHomeStore';
import {Dimensions, ViewStyle} from 'react-native';

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
    case '':
      return colors.primary;
    default:
      return colors.bg_opacity;
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
