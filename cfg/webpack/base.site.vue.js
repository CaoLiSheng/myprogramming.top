const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const base = require('./base.site');

module.exports = merge(base, {
  entry: {
    app: 'src/www/vue/app.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // loader: 'ts-loader',
        // exclude: /node_modules/,
        // options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/,
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
            ['@babel/preset-typescript', { allExtensions: true }],
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
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /lang=pug/,
            use: ['pug-plain-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            resourceQuery: /lang=styl(us)?/,
            use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/www/vue/index.html'),
      filename: './index.html',
      title: '又心真人的博客',
      chunks: ['app'],
    }),
  ],
});
