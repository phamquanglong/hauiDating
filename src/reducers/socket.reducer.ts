import {createAction, createReducer} from '@reduxjs/toolkit';
import {ISocketService} from '~services/Socket.service';

interface State {
  socket: ISocketService;
}

const initState: State = {
  socket: {} as ISocketService,
};

export const ActionInitSocket = createAction<ISocketService>('SOCKET.INIT');

export const actionResetSocket = createAction('SOCKET.RESET');

export const socketReducer = createReducer(initState, builder => {
  builder.addCase(ActionInitSocket, (state, {payload}) => {
    state.socket = payload;
  });
  builder.addCase(actionResetSocket, (state, {payload}) => {
    state.socket = {} as ISocketService;
  });
});
