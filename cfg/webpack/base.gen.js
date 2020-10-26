const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');

const base = require('./base.babel');

module.exports = merge(base, {
  target: 'node',
  entry: {
    generator: 'src/generator/index',
    templateV1: 'src/template/v1/index',
  },
  output: {
    filename: (chunkData) => {
      if ('generator' === chunkData.chunk.name) {
        return '[name].min.js';
      }
      return '[name].[hash:10].js';
    },
  },
  externals: [
    nodeExternals({ modulesDir: path.join(process.cwd(), 'node_modules') }),
  ],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
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
