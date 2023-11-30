import moment from 'moment';
import {StoreApi, UseBoundStore, create} from 'zustand';
import {GENDER} from '~utils/constants';

export type SetupProfileType = {
  fullName?: string;
  gender?: string;
  birthday?: string;
  bio?: string;
  hobbies?: number[];
  image?: string[];
  settingsProfile?: {
    old?: number[];
    gender?: string;
    distance?: number[];
  };
};

interface ISetupProfile {
  setupProfile: SetupProfileType | null;
  setSetupProfile: (value: SetupProfileType) => void;
}

export const defaultProfile = {
  fullName: '',
  gender: GENDER.MALE,
  birthday: moment(new Date()).format('DD/MM/YYYY'),
  bio: '',
  hobbies: [],
  image: [],
  settingsProfile: {
    old: [18, 100],
    distance: [0, 100],
    gender: GENDER.MALE,
  },
};

export const useSetupProfile: UseBoundStore<StoreApi<ISetupProfile>> = create(
  set => ({
    setupProfile: defaultProfile,
    setSetupProfile: (value: SetupProfileType) => set({setupProfile: value}),
  }),
);
