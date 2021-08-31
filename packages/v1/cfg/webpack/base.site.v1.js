const path = require ( 'path' );
const { merge } = require ( 'webpack-merge' );
const HtmlWebpackPlugin = require ( 'html-webpack-plugin' );

const site = require ( './base.site' );

module.exports = merge ( site, {
  entry: {
    app: 'src/www/v1/app',
  },
  module: {
    rules: [ require ( './rules/scss.loader' ) ],
  },
  plugins: [
    new HtmlWebpackPlugin ( {
      template: path.join ( process.cwd (), 'src/www/v1/index.html' ),
      favicon : path.join ( process.cwd (), 'src/www/v1/favicon.ico' ),
      filename: './index.html',
      title   : 'v1 | 博客 of 焱升',
      chunks  : [ 'app' ],
      cache   : false,
    } ),
  ],
} );
