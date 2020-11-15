const path = require('path');
const webpack = require('webpack');
const wba = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      __posts_root__: JSON.stringify('http://dev.myprogramming.top:5555/'),
    }),
  ],
};
