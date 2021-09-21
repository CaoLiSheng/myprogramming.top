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
    filename     : '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    // new wba.BundleAnalyzerPlugin(),
    require ( './vars/site.dev' ),
  ],
};
