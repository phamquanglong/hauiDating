import {createAction, createReducer} from '@reduxjs/toolkit';

interface State {
  listPartnersOnline: any[];
}

const initState: State = {
  listPartnersOnline: [],
};

export const setListPartnersOnlineAction = createAction<any>(
  'PARTNER.LIST_PARTNER_ONLINE',
);

export const partnerReducer = createReducer(initState, builder => {
  builder.addCase(setListPartnersOnlineAction, (state, {payload}) => {
    state.listPartnersOnline = payload;
  });
});
