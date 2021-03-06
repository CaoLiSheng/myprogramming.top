const path = require ( 'path' );
const { merge } = require ( 'webpack-merge' );
const VueLoaderPlugin = require ( 'vue-loader/lib/plugin' );
const HtmlWebpackPlugin = require ( 'html-webpack-plugin' );

const site = require ( './base.site' );

module.exports = merge ( site, {
  entry: {
    app: 'src/app',
  },
  module: {
    rules: [
      require ( './rules/babel.loader' ) ( { tsAllExts: true } ),
      require ( './rules/pug.loader' ),
      require ( './rules/vue.loader' ),
      require ( './rules/stylus.loader' ),
    ],
  },
  plugins: [
    new VueLoaderPlugin (),
    new HtmlWebpackPlugin ( {
      template: path.join ( process.cwd (), 'src/index.html' ),
      favicon : path.join ( process.cwd (), 'src/favicon.ico' ),
      filename: './index.html',
      title   : 'v2 | 博客 of 焱升',
      chunks  : [ 'app' ],
      cache   : false,
    } ),
  ],
} );
