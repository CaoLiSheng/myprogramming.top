const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./base.site.react');
const prod = require('./base.site.prod');

module.exports = merge(base, prod, {
  output: {
    path: path.join(process.cwd(), 'public', 'v1'),
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
});
