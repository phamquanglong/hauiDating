import {
  faGear,
  faHistory,
  faHome,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';
import {images} from '~utils/images';

export enum AUDIO_NAMES {
  RAININFOREST = 'rain_in_forest',
  BIRDSINGING = 'birds_singing',
}

export enum ROUTE_NAMES {
  HOMESTACK = 'HomeStack',
  HOMEDRAWER = 'HomeDrawer',
  SETTINGSSTACK = 'SettingsStack',
  HISTORYSTACK = 'HistoryStack',
  MESSAGESTACK = 'MessageStack',
  HOME = 'Home',
  SETTINGS = 'Settings',
  STARTUPCAROUSEL = 'StartUpCarousel',
  LOGIN = 'Login',
  REGISTER = 'Register',
  SETUPPROFILE = 'SetupProfile',
  HISTORY = 'History',
  LIKEDTAB = 'LikedTab',
  DISLIKEDTAB = 'DislikedTab',
  USERDETAIL = 'UserDetail',
  MESSAGE = 'Message',
  CONVERSATION = 'Conversation',
  EDITINFOSCREEN = 'EditInfoScreen',
  SCANNERSCREEN = 'ScannerScreen',
}

export enum LANGUAGE_NAMES {
  ENGLISH = 'English',
  VIETNAMESE = 'Vietnamese',
}

export enum NAME_TAGS {
  REST = 'Rest',
  SPORT = 'Sport',
  ENTERTAINMENT = 'Entertainment',
  STUDY = 'Study',
  WORK = 'Work',
  SOCIAL = 'Social',
  OTHER = 'Other',
}

export const siderBarItems = [
  {
    name: 'drawer.home',
    icon: faHome,
    navigator: ROUTE_NAMES.HOMESTACK,
  },
  {
    name: 'drawer.message',
    icon: faMessage,
    navigator: ROUTE_NAMES.MESSAGESTACK,
  },
  {
    name: 'drawer.history',
    icon: faHistory,
    navigator: ROUTE_NAMES.HISTORYSTACK,
  },
  {
    name: 'drawer.setting',
    icon: faGear,
    navigator: ROUTE_NAMES.SETTINGSSTACK,
  },
];

export const tags: Tag[] = [
  {
    id: '1',
    name: NAME_TAGS.REST,
    color: colors.black,
  },
  {
    id: '2',
    name: NAME_TAGS.SPORT,
    color: colors.black_opacity,
  },
  {
    id: '3',
    name: NAME_TAGS.ENTERTAINMENT,
    color: colors.primary,
  },
  {
    id: '4',
    name: NAME_TAGS.SOCIAL,
    color: colors.home.land,
  },
  {
    id: '5',
    name: NAME_TAGS.STUDY,
    color: colors.home.slider,
  },
  {
    id: '6',
    name: NAME_TAGS.WORK,
    color: colors.white,
  },
];

export const audios = [
  {
    fileName: AUDIO_NAMES.RAININFOREST,
    thumbnail: images.thumbnail_audios.rain_in_forest,
  },
  {
    fileName: AUDIO_NAMES.BIRDSINGING,
    thumbnail: images.thumbnail_audios.bird_singing,
  },
];

export const URL = '172.20.10.3';
// export const URL = 'localhost';
export const WS_URL = `http://${URL}:8080`;

export const WS_EVENT = {
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',

  TYPING: 'typing',
  TYPING_RES: 'typing_response',

  RECEIVE_USERS_ONLINE: 'receive_users_online',

  SEEN_MESSAGE: 'seen_message',
  RECEIVE_UPDATE_IS_SEEN_MESSAGE: 'receive_update_is_seen_message',

  DELETE_MESSAGE: 'delete_message',
  RECEIVE_DELETE_MESSAGE: 'receive_delete_message',

  UNMATCH: 'unmtch',
  RECEIVE_UNMATCH: 'receive_unmatch',
};

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  MORE = 'all',
}
