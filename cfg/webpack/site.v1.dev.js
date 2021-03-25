const { merge } = require( 'webpack-merge' );

const base = require( './base.site.v1' );
const dev = require( './base.site.dev' );

module.exports = merge( base, dev, {
  devServer: {
    port: 3000,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [ require( './rules/babel.loader' )( { dev: true, react: true } ) ],
  },
} );
