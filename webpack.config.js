const { mergeWithRules } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'openemp',
    projectName: 'login',
    webpackConfigEnv,
    argv,
  });

  console.log('webpackConfigEnv', webpackConfigEnv);

  const config = mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
      },
    },
  })(defaultConfig, {
    // customize the webpack config here
    plugins: [new DotenvWebpackPlugin()],
    module: {
      rules: [
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
    externals: ['single-spa', 'react-dom', 'react', new RegExp(`^@${defaultConfig.orgName}/`)],
  });

  return config;
};
