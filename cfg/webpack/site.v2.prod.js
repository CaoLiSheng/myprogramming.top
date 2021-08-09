const path = require ( 'path' );

const { merge } = require ( 'webpack-merge' );

const prod = require ( './base.site.prod' );
const v2 = require ( './base.site.v2' );

module.exports = merge ( prod, v2, {
  output: {
    path: path.join ( process.cwd (), 'docs', 'v2' ),
  },
  plugins: [],
} );
