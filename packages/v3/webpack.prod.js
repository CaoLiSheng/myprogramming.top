const path = require ( 'path' );
const { merge } = require ( 'webpack-merge' );

const prod = require ( './config/base.prod' );
const site = require ( './config/base.site' );

module.exports = merge ( prod, site, {
  output: {
    path: path.join ( process.cwd (), 'dist/app' ),
  },
  plugins: [],
} );
