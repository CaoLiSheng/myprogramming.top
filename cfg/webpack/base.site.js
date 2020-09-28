const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const wba = require('webpack-bundle-analyzer');

const base = require('./base.babel');

module.exports = merge(base, {
  target: 'web',
  entry: {
    app: 'src/www/app',
  },
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
      {
        test: /\.(eot|woff|woff2|ttf|svg|jpe?g|png|gif|wav)$/,
        loader: 'url-loader?limit=2048&name=[name]-[hash].[ext]',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: false,
      chunks: 'initial',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor1: {
          test: /[\\/]node_modules[\\/](.*?[\\/])*?(react|react-router|react-dom|react-router-dom)[\\/]/,
          chunks: 'all',
        },
        vendor2: {
          test: /[\\/]node_modules[\\/]semantic-ui/,
          chunks: 'all',
        },
        vendor3: {
          test: /[\\/]src[\\/]common[\\/]semantic[\\/]/,
          chunks: 'all',
        },
        vendor4: {
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          chunks: 'all',
        },
        vendor5: {
          test: /[\\/]node_modules[\\/]lodash(-es)?[\\/]/,
          chunks: 'all',
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
      },
    },
  },
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
});
