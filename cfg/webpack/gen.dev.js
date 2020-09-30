const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.gen');

module.exports = merge(base, {
  output: {
    path: path.join(process.cwd(), 'build', 'dev'),
  },
  plugins: [
    new webpack.DefinePlugin({
      __tpl_assets_dir__: JSON.stringify('build/dev'),
      __out_path__: JSON.stringify('build/posts'),
      __production__: false,
      __origin__: JSON.stringify('http://dev.myprogramming.top:3000'),
      __site_root__: JSON.stringify('http://dev.myprogramming.top:3000'),
    }),
  ],
});
