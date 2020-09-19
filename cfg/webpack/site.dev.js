const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const wba = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./base.site');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 3000,
    host: 'dev.myprogramming.top',
    disableHostCheck: true,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: 'last 2 versions',
                  },
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true,
                },
              ],
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-transform-runtime',
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new wba.BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      __posts_root__: JSON.stringify('http://localhost:5555/'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src', 'www', 'index.html'),
      filename: './index.html',
      title: '又心真人的博客',
      chunks: [
        'react',
        'semantic-ui',
        'semantic-css',
        'moment',
        'lodash',
        'vendors',
        'app',
      ],
    }),
  ],
});
