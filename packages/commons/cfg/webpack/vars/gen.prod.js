const webpack = require ( 'webpack' );

module.exports = new webpack.DefinePlugin ( {
  __production__  : JSON.stringify ( true ),
  __resource_dir__: JSON.stringify ( '//www.myprogramming.top/resources/' ),
} );