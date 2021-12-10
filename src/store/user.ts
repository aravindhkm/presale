import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { ActionWithPayload, RootState } from 'store';

type User = {
  ethAddress: string;
};

const initialState: User = {
  ethAddress: null,
};

const selectState = (state: RootState) => state.user;

export const selectUserEthAddress = createSelector(selectState, (user) => user.ethAddress);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEthAddress: (store, action: ActionWithPayload<string, string>) => {
      store.ethAddress = action.payload;
    },
  },
});

export const user = userSlice.reducer;

export const { setEthAddress } = userSlice.actions;
