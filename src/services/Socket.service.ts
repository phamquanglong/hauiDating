import {io} from 'socket.io-client';
import {WS_EVENT, WS_URL} from '~utils/constants';
import {storage} from './localStorage';

export interface ISocketService {
  socket: any;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string, conversationId: number) => void;
  receiveMessage: (listener: any) => void;
  setTypingStatus: (status: boolean, conversationId: number) => void;
  receiveTypingStatus: (listener: any) => void;
  receiveListUserOnline: (listener: any) => void;
  seenMessage: (conversationId: number) => void;
  receiveUpdateIsSeenMessage: (listener: any) => void;
  deleteMessage: (messageId: number, conversationId: number) => void;
  receiveDeleteMessage: (listener: any) => void;
  unmatch: (conversationId: number) => void;
  receiveUnmatch: (listener: any) => void;
}

export class SocketService implements ISocketService {
  public socket;
  constructor() {
    this.socket = io(WS_URL, {
      query: {token: storage.getString('accessToken')},
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(message: string, conversationId: number) {
    this.socket.emit(WS_EVENT.SEND_MESSAGE, {message, conversationId});
  }

  receiveMessage(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_MESSAGE, listener);
  }

  setTypingStatus(isTyping: boolean, conversationId: number) {
    this.socket.emit(WS_EVENT.TYPING, {isTyping, conversationId});
  }

  receiveTypingStatus(listener: any) {
    this.socket.on(WS_EVENT.TYPING_RES, listener);
  }

  receiveListUserOnline(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_USERS_ONLINE, listener);
  }
  seenMessage(conversationId: number) {
    this.socket.emit(WS_EVENT.SEEN_MESSAGE, {conversationId});
  }

  receiveUpdateIsSeenMessage(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_UPDATE_IS_SEEN_MESSAGE, listener);
  }
  deleteMessage(messageId: number, conversationId: number) {
    this.socket.emit(WS_EVENT.DELETE_MESSAGE, {messageId, conversationId});
  }

  receiveDeleteMessage(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_DELETE_MESSAGE, listener);
  }
  unmatch(conversationId: number) {
    this.socket.emit(WS_EVENT.UNMATCH, {conversationId});
  }

  receiveUnmatch(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_UNMATCH, listener);
  }
}
