// const webpack = require( 'webpack' );
const ForkTsCheckerWebpackPlugin = require ( 'fork-ts-checker-webpack-plugin' );
const TsconfigPathsPlugin = require ( 'tsconfig-paths-webpack-plugin' );
const { CleanWebpackPlugin } = require ( 'clean-webpack-plugin' );

module.exports = {
  devtool: 'eval-source-map',
  resolve: {
    modules   : [ 'node_modules' ],
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.vue' ],
    plugins   : [ new TsconfigPathsPlugin () ],
  },
  module: {
    rules: [ require ( './rules/url.loader' ) ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin (),
    // new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin ( { protectWebpackAssets: false } ),
  ],
};
