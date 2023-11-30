import {StoreApi, UseBoundStore, create} from 'zustand';
import {IUser} from '~apis/User';

interface SuggestUsersType {
  suggestUsers: IUser[] | null;
  setSuggestUsers: (value: IUser[]) => void;
}

export const useSuggestUsers: UseBoundStore<StoreApi<SuggestUsersType>> =
  create(set => ({
    suggestUsers: null,
    setSuggestUsers: (value: IUser[]) => set({suggestUsers: value}),
  }));
