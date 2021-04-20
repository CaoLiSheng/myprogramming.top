const webpack = require ( 'webpack' );

module.exports = {
  mode  : 'production',
  output: {
    publicPath   : './',
    filename     : '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin ( {
      __production__  : JSON.stringify ( true ),
      __resource_dir__: JSON.stringify ( '../resources/' ),
      __posts_root__  : JSON.stringify ( '../posts/' ),
      __portal_to_v1__: JSON.stringify ( '../v1/' ),
      __portal_to_v2__: JSON.stringify ( '../v2/' ),
    } ),
  ],
};
