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
    require ( './vars/gen.prod' ),
  ],
} );
