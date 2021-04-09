const path = require ( 'path' );
// const webpack = require('webpack');
const { merge } = require ( 'webpack-merge' );

const base = require ( './test.base' );

module.exports = merge ( base, {
  entry: {
    index: 'src/tests/lang',
  },
  output: {
    path: path.join ( process.cwd (), 'build/tests/lang' ),
  },
} );
