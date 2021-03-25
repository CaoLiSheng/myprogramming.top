const { merge } = require( 'webpack-merge' );

const base = require( './base.babel' );

module.exports = merge( base, {
  target: 'web',
  entry: {
    template: 'src/template/v1/index',
  },
  output: {
    filename: '[name].[hash:10].js',
  },
  module: {
    rules: [ require( './rules/babel.loader' )(), require( './rules/scss.loader' ) ],
  },
  plugins: [],
} );
