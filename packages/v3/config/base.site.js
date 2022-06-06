const path = require ( 'path' );
const webpack = require ( 'webpack' );
const { merge } = require ( 'webpack-merge' );
const VueLoaderPlugin = require ( 'vue-loader/lib/plugin' );
const HtmlWebpackPlugin = require ( 'html-webpack-plugin' );

const proj = require ( './base.proj' );

module.exports = merge ( proj, {
  target      : 'web',
  optimization: {
    splitChunks: {
      chunks                : 'async',
      minSize               : 30000,
      maxSize               : 200000,
      minChunks             : 1,
      maxAsyncRequests      : 10,
      maxInitialRequests    : 10,
      automaticNameDelimiter: '~',
    },
  },
  entry: {
    app: 'src/main',
  },
  module: {
    rules: [
      require ( './rules/babel.loader' ) ( { tsAllExts: true } ),
      require ( './rules/pug.loader' ),
      require ( './rules/vue.loader' ),
      require ( './rules/scss.loader' ),
      require ( './rules/stylus.loader' ),
      require ( './rules/url.loader' ),
    ],
  },
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin ( /^\.\/locale$/, /moment$/ ),
    new VueLoaderPlugin (),
    new HtmlWebpackPlugin ( {
      template: path.join ( process.cwd (), 'public/index.html' ),
      favicon : path.join ( process.cwd (), 'public/favicon.ico' ),
      filename: './index.html',
      title   : '又心の博客',
      chunks  : [ 'app' ],
      cache   : false,
    } ),
  ],
} );
