const webpack = require ( 'webpack' );

module.exports = new webpack.DefinePlugin ( {
  __production__  : JSON.stringify ( true ),
  __resource_dir__: JSON.stringify ( '//www.myprogramming.top/resources/' ),
  __posts_root__  : JSON.stringify ( '//www.myprogramming.top/posts/' ),
  __portal_to_v1__: JSON.stringify ( '//www.myprogramming.top/v1/' ),
  __portal_to_v2__: JSON.stringify ( '//www.myprogramming.top/v2/' ),
} );