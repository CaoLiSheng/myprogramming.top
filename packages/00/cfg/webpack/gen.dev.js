const path = require ( 'path' );
const webpack = require ( 'webpack' );
const { merge } = require ( 'webpack-merge' );

const dev = require ( './base.dev' );
const gen = require ( './base.gen' );

module.exports = merge ( dev, gen, {
  output: {
    path    : path.join ( process.cwd (), 'build/gen/dev' ),
    filename: '[name].js',
  },
  plugins: [
    require ( './vars/gen.dev' ),
  ],
} );
