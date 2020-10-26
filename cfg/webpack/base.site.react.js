const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./base.site');

module.exports = merge(base, {
  entry: {
    app: 'src/www/react/app',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/www/react/index.html'),
      filename: './index.html',
      title: '又心真人的博客',
      chunks: ['app'],
    }),
  ],
});
