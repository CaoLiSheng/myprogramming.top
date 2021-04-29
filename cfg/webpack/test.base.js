const path = require ( 'path' );
const nodeExternals = require ( 'webpack-node-externals' );
const { merge } = require ( 'webpack-merge' );

const proj = require ( './base.proj' );

module.exports = merge ( proj, {
  mode  : 'development',
  target: 'node',
  output: {
    filename  : '[name].min.js',
    publicPath: '/',
  },
  externals: [
    nodeExternals ( { modulesDir: path.join ( process.cwd (), 'node_modules' ) } ),
  ],
  resolve: {
    extensions: [ '.wasm', '.mjs', '.js', '.ts', '.json' ],
  },
  module: {
    rules: [ require ( './rules/mjs.auto' ), require ( './rules/babel.loader' ) () ],
  },
} );
