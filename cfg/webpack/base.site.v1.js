const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./base.site');

module.exports = merge(base, {
  entry: {
    app: 'src/www/v1/app',
  },
  module: {
    rules: [require('./rules/scss.loader')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/www/v1/index.html'),
      favicon: path.join(process.cwd(), 'src/images/favicon.ico'),
      filename: './index.html',
      title: '又心真人的博客',
      chunks: ['app'],
      cache: false,
    }),
  ],
});
