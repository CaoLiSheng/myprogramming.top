const { merge } = require ( 'webpack-merge' );

const dev = require ( './base.site.dev' );
const v1 = require ( './base.site.v1' );

module.exports = merge ( dev, v1, {
  devServer: {
    port: 3000,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [ require ( './rules/babel.loader' ) ( { dev: true, react: true } ) ],
  },
} );
