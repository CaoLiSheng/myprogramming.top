const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.site.v1.tpl');

module.exports = merge(base, {
  output: {
    path: path.join(process.cwd(), 'build/v1/dev'),
  },
  plugins: [
    new webpack.DefinePlugin({
      __origin__: JSON.stringify('http://dev.myprogramming.top:3000'),
      __site_root__: JSON.stringify('http://dev.myprogramming.top:3000'),
    }),
  ],
});
