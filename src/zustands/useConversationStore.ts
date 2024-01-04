import {StoreApi, UseBoundStore, create} from 'zustand';

interface ConversationStoreType {
  conversation: any[];
  setConversation: (value: any[]) => void;
  addMessage: (value: any) => void;
  removeTyping: () => void;
  latestMessage: {
    id: any;
    message: string | null;
  }[];
  setLatestMessage: (value: {id: any; message: string}) => void;
  getLatestMessage: (id: any, t: any) => any;
}

export const useConversationStore: UseBoundStore<
  StoreApi<ConversationStoreType>
> = create((set, get) => ({
  conversation: [],
  latestMessage: [],
  addMessage: (message: any) =>
    set(state => ({conversation: [...state.conversation, message]})),
  removeTyping: () =>
    set(state => ({
      conversation: state.conversation.filter(i => i?.isTyping !== true),
    })),
  setConversation: (value: any[]) => set({conversation: value}),
  setLatestMessage: (value: {id: any; message: string}) =>
    set(state => {
      const mess = state.latestMessage;
      const message = mess?.find(i => i.id === value.id);
      if (message && mess) {
        const index = mess?.indexOf(message) ?? 0;
        mess[index] = value;
      }
      if (!message) {
        mess.push(value);
      }
      return {latestMessage: mess};
    }),
  getLatestMessage: (id: any, t: any) => {
    const message = get().latestMessage?.find(i => i.id === id);
    if (message?.message?.includes('https://res.cloudinary.com')) {
      return {
        ...message,
        message: `[${t('image')}]`,
      };
    }
    return message;
  },
}));
