const path = require('path');
const webpack = require('webpack');
const wba = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  devServer: {
    quiet: true,
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
      __production__: JSON.stringify(false),
      __resources_dir__: JSON.stringify('./'),
      __posts_root__: JSON.stringify('http://dev.myprogramming.top:5555/'),
      __portal_to_v1__: JSON.stringify('http://dev.myprogramming.top:3000'),
      __portal_to_v2__: JSON.stringify('http://dev.myprogramming.top:3333'),
    }),
  ],
};
