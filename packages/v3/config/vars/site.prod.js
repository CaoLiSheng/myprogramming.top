const webpack = require ( 'webpack' );

module.exports = new webpack.DefinePlugin ( {
  __production__  : JSON.stringify ( true ),
} );