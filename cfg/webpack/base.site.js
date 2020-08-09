const path = require('path');
const webpack = require('webpack');
const {
  merge
} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./base.babel');
const template = path.join(process.cwd(), 'src', 'site', 'index.html');

module.exports = merge(base, {
  target: 'web',
  entry: {
    app: 'src/site/index',
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  module: {
    rules: [{
        test: /(\.s?css$|\/css\?.*)/,
        include: [path.join(process.cwd(), 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|jpe?g|png|gif)$/,
        loader: 'url-loader?limit=2048&name=[name]-[hash].[ext]',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 80000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 7,
      maxInitialRequests: 7,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor1: {
          test: /[\\/]node_modules[\\/](.*?[\\/])*?(react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
        vendor2: {
          test: /[\\/]node_modules[\\/]semantic-ui/,
          name: 'semantic-ui',
          chunks: 'all',
        },
        vendor3: {
          test: /[\\/]src[\\/]common[\\/]semantic[\\/]/,
          name: 'semantic-css',
          chunks: 'all',
        },
        vendor4: {
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          name: 'moment',
          chunks: 'all',
        },
        vendor5: {
          test: /[\\/]node_modules[\\/]lodash(-es)?[\\/]/,
          name: 'lodash',
          chunks: 'all',
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minChunks: 1,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template,
      filename: './index.html',
      title: '又心真人的博客',
      chunks: [
        'react',
        'semantic-ui',
        'semantic-css',
        'moment',
        'lodash',
        'vendors',
        'app',
      ],
    }),
  ],
});
