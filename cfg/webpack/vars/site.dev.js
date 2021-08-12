const webpack = require ( 'webpack' );

module.exports = new webpack.DefinePlugin ( {
  __production__  : JSON.stringify ( false ),
  __resource_dir__: JSON.stringify ( 'http://127.0.0.1:60000/' ),
  __posts_root__  : JSON.stringify ( 'http://127.0.0.1:59999/' ),
  __portal_to_v1__: JSON.stringify ( 'http://127.0.0.1:3000/' ),
  __portal_to_v2__: JSON.stringify ( 'http://127.0.0.1:3333/' ), 
} );