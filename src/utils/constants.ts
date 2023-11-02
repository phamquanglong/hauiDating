import {faGear, faHome} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';
import {images} from '~utils/images';

export enum AUDIO_NAMES {
  RAININFOREST = 'rain_in_forest',
  BIRDSINGING = 'birds_singing',
}

export enum ROUTE_NAMES {
  HOMESTACK = 'HomeStack',
  SETTINGSSTACK = 'SettingsStack',
  HOME = 'Home',
  SETTINGS = 'Settings',
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
    name: ROUTE_NAMES.HOMESTACK,
    icon: faHome,
  },
  {
    name: ROUTE_NAMES.SETTINGSSTACK,
    icon: faGear,
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
