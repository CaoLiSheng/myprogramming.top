const path = require( 'path' );
const webpack = require( 'webpack' );
const { merge } = require( 'webpack-merge' );

const base = require( './base.gen' );

module.exports = merge( base, {
  mode: 'development',
  output: {
    path: path.join( process.cwd(), 'build/gen/dev' ),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin( {
      __production__: false,
      __resources_dir__: JSON.stringify( './' ),
    } ),
  ],
} );
