const path = require( 'path' );

const { merge } = require( 'webpack-merge' );

const base = require( './base.site.v2' );
const dev = require( './base.site.dev' );

module.exports = merge( base, dev, {
  devServer: {
    writeToDisk: true,
  },
  output: {
    path: path.join( process.cwd(), 'build/v2/dev' ),
  },
  plugins: [],
} );
