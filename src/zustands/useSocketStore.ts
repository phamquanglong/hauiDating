import {StoreApi, UseBoundStore, create} from 'zustand';
import {SocketService} from '~services/Socket.service';

interface SocketType {
  appSocket: SocketService | null;
  listUserOnline: any[];
  listConversation: any[];
  setSocket: (value: any) => void;
  setListUserOnline: (value: any) => void;
  setListConversation: (value: any) => void;
}

export const useSocketStore: UseBoundStore<StoreApi<SocketType>> = create(
  set => ({
    appSocket: null,
    listUserOnline: [],
    listConversation: [],
    setSocket: (value: any) => set({appSocket: value}),
    setListUserOnline: (value: any) => set({listUserOnline: value}),
    setListConversation: value => set({listConversation: value}),
  }),
);
