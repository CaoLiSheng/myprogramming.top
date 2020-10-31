const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(eot|woff|woff2|ttf|svg|jpe?g|png|gif|wav)$/,
        loader: 'url-loader?limit=2048&name=[name]-[hash:10].[ext]',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin({
      // dry: true,
      cleanAfterEveryBuildPatterns: ['*.js', '!*.wav', '!*.html'],
    }),
  ],
};
