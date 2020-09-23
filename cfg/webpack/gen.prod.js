const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.gen');

module.exports = merge(base, {
  output: {
    path: path.join(process.cwd(), 'build', 'prod'),
  },
  plugins: [
    new webpack.DefinePlugin({
      __tpl_script_path__: JSON.stringify('build/prod/template.min.js'),
      __out_path__: JSON.stringify('public/posts'),
      __production__: true,
      __origin__: JSON.stringify('https://yx1991.gitee.io'),
      __site_root__: JSON.stringify('https://yx1991.gitee.io/blog'),
    }),
  ],
});
