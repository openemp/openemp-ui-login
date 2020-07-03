const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const apiMocker = require('connect-api-mocker');
const path = require('path');

require('dotenv').config();

const { env } = process;

module.exports = (webpackConfigEnv = {}) => {
  const opts = {
    orgName: env.ORG_NAME,
    projectName: env.PROJECT_NAME,
    port: env.PORT,
  };

  return {
    entry: path.resolve(__dirname, `src`),
    output: {
      filename: `${opts.orgName}-${opts.projectName}.js`,
      libraryTarget: 'system',
      path: path.resolve(__dirname, 'dist'),
      jsonpFunction: `webpackJsonp_${opts.projectName}`,
    },
    module: {
      rules: [
        {
          parser: {
            system: false,
          },
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
        {
          type: 'javascript/auto',
          test: /\.i18n\.json$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './public/i18n/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      before: (app) => {
        app.use(apiMocker('/api/v1', 'mock-api'));
      },
      compress: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      disableHostCheck: true,
      port: opts.port,
    },
    externals: [
      'react',
      'react-dom',
      '@reach/router',
      'single-spa',
      new RegExp(`^@${opts.orgName}/`),
      'regenerator-runtime',
      'axios',
    ],

    plugins: [
      new DotenvWebpackPlugin(),
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: webpackConfigEnv.analyze ? 'server' : 'disabled',
      }),
      new UnusedFilesWebpackPlugin({
        globOptions: {
          cwd: path.resolve(__dirname, 'src'),
          ignore: ['**/*.test.*', '**/*.spec.*', '**/*.*.snap', '**/test-setup.*', '**/*.stories.*'],
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.wasm', '.json'],
      alias: {
        api: path.resolve(__dirname, 'src/api'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        features: path.resolve(__dirname, 'src/features'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        reducer: path.resolve(__dirname, 'src/reducer'),
      },
    },
  };
};
