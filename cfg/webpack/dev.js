const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const wba = require('webpack-bundle-analyzer');

const base = require('./base.site');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 3000,
    host: 'dev.myprogramming.top',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
  },
  plugins: [
    new wba.BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      __posts_pdir__: JSON.stringify('http://localhost:5000/'),
    }),
  ],
});
