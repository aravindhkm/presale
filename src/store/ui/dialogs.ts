import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { ActionWithPayload, RootState } from 'store';
import { DialogProps } from 'UI/Modal/Dialog';

type DialogItem = { id: string; Component: React.ComponentType<DialogProps<any, any>>; props: DialogProps<any> };

type DialogState = {
  items: DialogItem[];
  current: string;
};

const selectState = (store: RootState) => store.ui.dialogs;

export const selectDialogs = createSelector(selectState, (state) => state.items);

export const selectCurrentDialog = createSelector(selectState, (state) => {
  return state.items.find((item) => item.id === state.current);
});

const initialState: DialogState = {
  items: [],
  current: null,
};

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    addDialog: (state, action: ActionWithPayload<string, DialogItem>) => {
      state.items.push(action.payload);
      state.current = action.payload.id;
    },
    removeDialog: (state, action: ActionWithPayload<string, string>) => {
      const dialogIndex = state.items.findIndex((item) => item.id === action.payload);
      if (state.items[dialogIndex]) {
        state.items.splice(dialogIndex, 1);
        state.current = state.items[state.items.length - 1]?.id ?? null;
      }
    },
    removeCurrentDialog: (state) => {
      const dialogIndex = state.items.findIndex((item) => item.id === state.current);
      if (state.items[dialogIndex]) {
        state.items.splice(dialogIndex, 1);
        state.current = state.items[state.items.length - 1]?.id ?? null;
      }
    },
  },
});

export const dialogs = dialogsSlice.reducer;

export const { addDialog, removeDialog, removeCurrentDialog } = dialogsSlice.actions;
