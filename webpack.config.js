const { resolve, join } = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const isDevelopment = options.mode === 'development';
  const isBundleResearch = isProduction && env.bundle;

  dotenv.config({ path: resolve(__dirname, '.env') });

  process.env.NODE_ENV = options.mode;
  process.env.BABEL_ENV = options.mode;

  /** @type {import('webpack').Configuration} */
  const config = {
    entry: resolve(__dirname, 'src/'),
    resolve: {
      fallback: {
        os: false,
        https: false,
        http: false,
        crypto: false,
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      },
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        api: resolve(__dirname, 'src/api/'),
        components: resolve(__dirname, 'src/components/'),
        constants: resolve(__dirname, 'src/constants/'),
        pages: resolve(__dirname, 'src/pages/'),
        helpers: resolve(__dirname, 'src/helpers/'),
        '@types': resolve(__dirname, 'src/@types/'),
        assets: resolve(__dirname, 'src/assets/'),
        layout: resolve(__dirname, 'src/layout'),
        store: resolve(__dirname, 'src/store/'),
        UI: resolve(__dirname, 'src/UI'),
      },
    },
    output: {
      filename: 'bundle-[fullhash].js',
      path: resolve(__dirname, 'build/release'),
      publicPath: '/',
    },
    devtool: isDevelopment && 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          include: resolve(__dirname, 'src/'),
          exclude: resolve(__dirname, 'node_modules/'),
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [require.resolve('babel-preset-react-app'), { runtime: 'automatic' }],
              '@emotion/babel-preset-css-prop',
            ],
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            cacheDirectory: true,
            cacheCompression: false,
            compact: isProduction,
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true,
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(ttf|eot|woff|woff2?)(\?[a-z0-9]+)?$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({ process: 'process/browser' }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
      }),
    ],
    devServer: {
      static: {
        directory: join(__dirname, 'public'),
      },
      historyApiFallback: true,
      port: process.env.DEV_PORT || 3001,
      // proxy: {
      //   '/api': {
      //     target: process.env.API_URL,
      //     secure: false,
      //     changeOrigin: true,
      //   },
      // },
    },
  };

  if (isDevelopment && options.hot) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin());
  }

  if (isProduction) {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            filename: 'vendor.js',
            priority: -10,
            reuseExistingChunk: true,
            chunks: 'initial',
          },
        },
      },
    };
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: resolve(__dirname, 'public/static'), to: 'static' },
        ],
      }),
    );
    if (isBundleResearch) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  }
  return config;
};
