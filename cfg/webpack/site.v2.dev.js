const path = require ( 'path' );

const { merge } = require ( 'webpack-merge' );

const dev = require ( './base.site.dev' );
const v2 = require ( './base.site.v2' );

module.exports = merge ( dev, v2, {
  devServer: {
    port: 3333,
  },
  plugins: [],
} );
