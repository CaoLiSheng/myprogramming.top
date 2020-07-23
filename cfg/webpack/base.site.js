const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.babel');
const template = path.join(__dirname, 'src', 'site', 'index.html');

module.exports = merge(base, {
  entry: {
    app: 'src/site/index',
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-transform-runtime',
              'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /(\.s?css$|\/css\?.*)/,
        include: [path.join(__dirname, 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|jpe?g|png|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
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
