const path = require ( 'path' );
const { merge } = require ( 'webpack-merge' );

const dev = require ( './config/base.dev' );
const site = require ( './config/base.site' );

module.exports = merge ( dev, site, {
  devServer: {
    port: 3333,
  },
  plugins: [],
} );
