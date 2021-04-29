const path = require ( 'path' );
const webpack = require ( 'webpack' );
const { merge } = require ( 'webpack-merge' );

const prod = require ( './base.prod' );
const gen = require ( './base.gen' );

module.exports = merge ( prod, gen, {
  output: {
    path    : path.join ( process.cwd (), 'build/gen/prod' ),
    filename: '[name].min.js',
  },
  plugins: [
    new webpack.DefinePlugin ( {
      __production__  : JSON.stringify ( true ),
      __resource_dir__: JSON.stringify ( '../resources/' ),
    } ),
  ],
} );
