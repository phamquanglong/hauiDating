import {StoreApi, UseBoundStore, create} from 'zustand';
import {ReactNode} from 'react';
import {AUDIO_NAMES} from '~utils/constants';

export enum Position {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  center = 'center',
}

export interface GlobalModalType {
  message?: string;
  visible: boolean;
  position?: Position;
  yesNoOption: {
    visible: boolean;
    onYes?: () => void;
    onNo?: () => void;
  };
  children?: ReactNode;
}

interface HomeStoreType {
  language?: string;
  isPlant: boolean;
  timer: number;
  currentTimer: number;
  onPlant: () => void;
  onGiveUp: () => void;
  setTimer: (value: number) => void;
  setCurrentTimer: (value: number) => void;
  globalModal: GlobalModalType;
  setGlobalModal: (value: GlobalModalType) => void;
  focusedTime: number;
  isSuccess: boolean | null;
  setIsSuccess: (value: boolean | null) => void;
  audio?: {
    isPlaying: boolean;
    fileName?: string;
  };
  setAudio: (value: {isPlaying: boolean; fileName?: string}) => void;
  setLanguage: (value: string) => void;
  coins: number;
  setCoins: (value: number) => void;
}

const useHomeStore: UseBoundStore<StoreApi<HomeStoreType>> = create(set => ({
  language: '',
  isPlant: false,
  timer: 0,
  focusedTime: 0,
  isSuccess: null,
  currentTimer: 0,
  globalModal: {
    message: '',
    visible: false,
    yesNoOption: {
      visible: false,
      onNo: undefined,
      onYes: undefined,
    },
  },
  coins: 0,
  onPlant: () =>
    set({
      isPlant: true,
      globalModal: {
        visible: false,
        yesNoOption: {
          visible: false,
        },
      },
      audio: {
        isPlaying: true,
        fileName: AUDIO_NAMES.RAININFOREST,
      },
    }),
  onGiveUp: () =>
    set({
      isPlant: false,
      timer: 0,
      currentTimer: 0,
      isSuccess: false,
      audio: {
        isPlaying: false,
        fileName: undefined,
      },
    }),
  setTimer: value => {
    set(() => ({
      timer: value,
    }));
  },
  setCurrentTimer: value =>
    set(() => ({
      currentTimer: value,
    })),
  setGlobalModal: (value: GlobalModalType) =>
    set(() => ({
      globalModal: value,
    })),
  setFocusedTime: (value: number) =>
    set(() => ({
      focusedTime: value,
    })),
  setIsSuccess: (value: boolean | null) =>
    set(() => ({
      isSuccess: value,
      isPlant: false,
      timer: 0,
      currentTimer: 0,
      audio: {
        isPlaying: false,
        fileName: undefined,
      },
    })),
  audio: {
    isPlaying: true,
    fileName: AUDIO_NAMES.RAININFOREST,
  },
  setAudio: value => {
    set(() => ({
      audio: value,
      globalModal: {
        visible: false,
        yesNoOption: {
          visible: false,
        },
      },
    }));
  },
  setLanguage: value => {
    set(() => ({
      language: value,
    }));
  },
  setCoins: value =>
    set(() => ({
      coins: value,
    })),
}));

export default useHomeStore;
