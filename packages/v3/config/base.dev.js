const path = require ( 'path' );

module.exports = {
  mode        : 'development',
  devtool     : 'source-map',
  optimization: {
    minimize: false,
  },
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
