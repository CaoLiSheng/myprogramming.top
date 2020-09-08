const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./base.site');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.join(process.cwd(), 'public'),
    publicPath: './',
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
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __posts_pdir__: JSON.stringify('./'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src', 'www', 'index.prod.html'),
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
