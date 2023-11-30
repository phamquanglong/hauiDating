import {conversationsReducer} from './conversations.reducer';
import {messagesReducer} from './messages.reducer';
import {socketReducer} from './socket.reducer';
import {partnerReducer} from './partner.reducer';

export const rootReducer = {
  conversationsReducer,
  messagesReducer,
  socketReducer,
  partnerReducer,
};
