const webpack = require ( 'webpack' );

module.exports = {
  output: {
    publicPath   : './',
    filename     : '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  plugins: [
    require ( './vars/site.prod' ),
  ],
};
