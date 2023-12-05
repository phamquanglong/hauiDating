import {StoreApi, UseBoundStore, create} from 'zustand';

interface ConversationStoreType {
  conversation: any[];
  setConversation: (value: any[]) => void;
  addMessage: (value: any) => void;
  removeTyping: () => void;
}

export const useConversationStore: UseBoundStore<
  StoreApi<ConversationStoreType>
> = create(set => ({
  conversation: [],
  addMessage: (message: any) =>
    set(state => ({conversation: [...state.conversation, message]})),
  removeTyping: () =>
    set(state => ({
      conversation: state.conversation.filter(i => i?.isTyping !== true),
    })),
  setConversation: (value: any[]) => set({conversation: value}),
}));
