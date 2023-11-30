import {createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import ConversationApi from '~apis/conversation.api';

interface State {
  listConversations: any[];
  loading: boolean;
  selectedConversation: any;
}

const initState: State = {
  listConversations: [],
  loading: false,
  selectedConversation: {},
};

export const callApiGetAllConversations = createAsyncThunk(
  'CONVERSATIONS.LIST',
  async (_, thunkApi) => {
    try {
      return await ConversationApi.getAllConversation();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const actionSelectConversation = createAction('CONVERSATIONS.SELECT');

export const actionResetConversation = createAction('CONVERSATION.RESET');
export const actionSortConversation = createAction<any>('CONVERSATION.SORT');

export const conversationsReducer = createReducer(initState, builder => {
  builder.addCase(actionSelectConversation, (state, {payload}) => {
    state.selectedConversation = payload;
  });

  builder.addCase(actionResetConversation, state => {
    state.listConversations = [];
    state.selectedConversation = {};
  });

  builder.addCase(actionSortConversation, (state, {payload}) => {
    state.listConversations = [
      payload,
      ...state.listConversations.filter(conv => conv?.id !== payload?.id),
    ];
  });

  builder
    .addCase(callApiGetAllConversations.pending, state => {
      state.loading = true;
    })
    .addCase(callApiGetAllConversations.fulfilled, (state, {payload}) => {
      state.listConversations = payload?.data || [];
      state.loading = false;
    })
    .addCase(callApiGetAllConversations.rejected, state => {
      state.listConversations = [];
      state.loading = false;
    });
});
