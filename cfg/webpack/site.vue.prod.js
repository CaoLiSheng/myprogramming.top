const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { merge } = require('webpack-merge');

const base = require('./base.site.vue');
const dev = require('./base.site.prod');

module.exports = merge(base, dev, {
  output: {
    path: path.join(process.cwd(), 'build/v2/prod'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/www/vue/index.prod.html'),
      filename: './index.html',
      title: '又心真人的博客',
      chunks: ['app'],
    }),
  ],
});
