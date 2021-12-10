import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ui } from './ui';
import { user } from './user';

export type Action<T extends string> = { type: T };
export type ActionWithPayload<T extends string, P> = { type: T; payload: P };

const reducer = combineReducers({
  user,
  ui,
});

export const store = createStore(reducer, composeWithDevTools());

export type RootState = ReturnType<typeof reducer>;
