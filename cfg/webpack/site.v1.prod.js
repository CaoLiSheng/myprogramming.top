const path = require ( 'path' );
const { merge } = require ( 'webpack-merge' );

const prod = require ( './base.site.prod' );
const v1 = require ( './base.site.v1' );

module.exports = merge ( prod, v1, {
  output: {
    path: path.join ( process.cwd (), 'public', 'v1' ),
  },
  module: {
    rules: [ require ( './rules/babel.loader' ) ( { react: true } ) ],
  },
} );
