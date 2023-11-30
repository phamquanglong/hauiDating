import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '~reducers/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;

export default store;
