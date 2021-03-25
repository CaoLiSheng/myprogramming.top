const path = require( 'path' );

const { merge } = require( 'webpack-merge' );

const base = require( './base.site.v2' );
const dev = require( './base.site.prod' );

module.exports = merge( base, dev, {
  output: {
    path: path.join( process.cwd(), 'build/v2/prod' ),
  },
  plugins: [],
} );
