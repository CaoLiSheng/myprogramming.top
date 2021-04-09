const path = require ( 'path' );
const { merge } = require ( 'webpack-merge' );
const VueLoaderPlugin = require ( 'vue-loader/lib/plugin' );
const HtmlWebpackPlugin = require ( 'html-webpack-plugin' );

const base = require ( './base.site' );

module.exports = merge ( base, {
  entry: {
    app: 'src/www/v2/app',
  },
  module: {
    rules: [
      require ( './rules/babel.loader' ) ( { tsAllExts: true } ),
      require ( './rules/pug.loader' ),
      require ( './rules/vue.loader' ),
      require ( './rules/stylus.loader' ),
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      // },
    ],
  },
  plugins: [
    new VueLoaderPlugin (),
    new HtmlWebpackPlugin ( {
      template: path.join ( process.cwd (), 'src/template/v2/index.html' ),
      favicon : path.join ( process.cwd (), 'src/images/favicon.ico' ),
      filename: './index.html',
      title   : '又心真人的博客',
      chunks  : [ 'app' ],
      cache   : false,
    } ),
  ],
} );
