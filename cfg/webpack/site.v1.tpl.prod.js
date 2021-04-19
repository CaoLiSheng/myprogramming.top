const path = require ( 'path' );
const webpack = require ( 'webpack' );
const { merge } = require ( 'webpack-merge' );

const base = require ( './base.site.v1.tpl' );

module.exports = merge ( base, {
  output: {
    path: path.join ( process.cwd (), 'build/v1/prod' ),
  },
  plugins: [
    new webpack.DefinePlugin ( {
      __resource_dir__: JSON.stringify ( '../resources/' ),
      __origin__       : JSON.stringify ( 'https://yx1991.gitee.io' ),
      __site_root__    : JSON.stringify ( 'https://yx1991.gitee.io/blog' ),
    } ),
  ],
} );
