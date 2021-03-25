const path = require( 'path' );
const webpack = require( 'webpack' );
const { merge } = require( 'webpack-merge' );

const base = require( './base.gen' );

module.exports = merge( base, {
  mode: 'production',
  output: {
    path: path.join( process.cwd(), 'build/gen/prod' ),
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin( {
      __production__: true,
      __resources_dir__: JSON.stringify( '../resources/' ),
    } ),
  ],
} );
