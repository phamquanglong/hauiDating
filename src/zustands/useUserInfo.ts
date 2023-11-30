import {StoreApi, UseBoundStore, create} from 'zustand';
import {IUser} from '~apis/User';

interface UserInfoType {
  userInfo: IUser | null;
  setUserInfo: (value: IUser | null) => void;
}

export const useUserInfo: UseBoundStore<StoreApi<UserInfoType>> = create(
  set => ({
    userInfo: null,
    setUserInfo: (value: IUser | null) => set({userInfo: value}),
  }),
);
