const { resolve } = require('path');

const aliases = {
  api: resolve(__dirname, '../src/api/'),
  components: resolve(__dirname, '../src/components/'),
  constants: resolve(__dirname, '../src/constants/'),
  pages: resolve(__dirname, '../src/pages/'),
  utils: resolve(__dirname, '../src/utils/'),
  UI: resolve(__dirname, '../src/UI'),
};

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...aliases,
        },
      },
    };
  },
};
