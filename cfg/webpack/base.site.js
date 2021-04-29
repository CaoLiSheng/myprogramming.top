const path = require ( 'path' );
const webpack = require ( 'webpack' );
const { merge } = require ( 'webpack-merge' );

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
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin ( /^\.\/locale$/, /moment$/ ),
  ],
} );
