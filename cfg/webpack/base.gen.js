const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.babel');

module.exports = merge(base, {
  target: 'node',
  mode: 'production',
  entry: {
    generator: 'src/generator/index',
    template: 'src/template/basic/index',
  },
  output: {
    filename: (chunkData) => {
      if ('generator' === chunkData.chunk.name) {
        return '[name].min.js';
      }
      return '[name].[hash].js';
    },
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
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({})],
});
