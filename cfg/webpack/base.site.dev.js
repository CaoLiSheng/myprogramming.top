const path = require ( 'path' );
const webpack = require ( 'webpack' );
// const wba = require( 'webpack-bundle-analyzer' );

module.exports = {
  devServer: {
    host            : '0.0.0.0',
    quiet           : true,
    disableHostCheck: true,
    hot             : true,
  },
  output: {
    path         : path.join ( process.cwd (), 'dist' ),
    publicPath   : '/',
    clean        : true,
    filename     : '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    new webpack.DefinePlugin ( {
      __production__  : JSON.stringify ( false ),
      __resource_dir__: JSON.stringify ( 'http://127.0.0.1:60000/' ),
      __posts_root__  : JSON.stringify ( 'http://127.0.0.1:59999/' ),
      __portal_to_v1__: JSON.stringify ( 'http://dev.myprogramming.top:3000/' ),
      __portal_to_v2__: JSON.stringify ( 'http://dev.myprogramming.top:3333/' ),
    } ),
  ],
};
