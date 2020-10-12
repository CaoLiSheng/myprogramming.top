const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.gen');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.join(process.cwd(), 'build', 'prod'),
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      __tpl_assets_dir__: JSON.stringify('build/prod'),
      __out_path__: JSON.stringify('public/posts'),
      __production__: true,
      __origin__: JSON.stringify('https://yx1991.gitee.io'),
      __site_root__: JSON.stringify('https://yx1991.gitee.io/blog'),
    }),
  ],
});
