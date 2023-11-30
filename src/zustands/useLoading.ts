import {StoreApi, UseBoundStore, create} from 'zustand';

interface SuggestUsersType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useLoading: UseBoundStore<StoreApi<SuggestUsersType>> = create(
  set => ({
    loading: false,
    setLoading: (value: boolean) => set({loading: value}),
  }),
);
