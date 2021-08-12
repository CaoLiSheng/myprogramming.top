const webpack = require ( 'webpack' );

module.exports = new webpack.DefinePlugin ( {
  __production__  : JSON.stringify ( false ),
  __resource_dir__: JSON.stringify ( 'http://127.0.0.1:60000/' ),
} );