import { ThemeSwitcher } from '../src/UI/ThemeSwitcher/ThemeSwitcher';
import { addDecorator } from '@storybook/react';
import { MediaWatcher } from 'UI/MediaWatcher/MediaWatcher';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withGlobal = (cb) => (
  <ThemeSwitcher>
    <MediaWatcher>{cb()}</MediaWatcher>
    <div id="popup-root" />
    <div id="modal-root" />
  </ThemeSwitcher>
);

addDecorator(withGlobal);
