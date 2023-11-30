import {StoreApi, UseBoundStore, create} from 'zustand';

interface HistoryStoreType {
  likedList: any[];
  dislikedList: any[];
  likedMeList: any[];
  setLikedList: (value: any[]) => void;
  setDislikedList: (value: any[]) => void;
  setLikedMeList: (value: any[]) => void;
}

export const useHistoryStore: UseBoundStore<StoreApi<HistoryStoreType>> =
  create(set => ({
    likedList: [],
    dislikedList: [],
    likedMeList: [],
    setLikedList: (value: any[]) => set({likedList: value}),
    setDislikedList: (value: any[]) => set({dislikedList: value}),
    setLikedMeList: (value: any[]) => set({likedMeList: value}),
  }));
