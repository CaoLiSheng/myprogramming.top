const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.babel');

module.exports = merge(base, {
  target: 'web',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /(\.s?css$|\/css\?.*)/,
        include: [path.join(process.cwd(), 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      automaticNameDelimiter: '~',
    },
  },
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
});
