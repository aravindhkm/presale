import { combineReducers } from 'redux';
import { dialogs } from './dialogs';
import { i18n } from './i18n';

export const ui = combineReducers({ dialogs, i18n });
