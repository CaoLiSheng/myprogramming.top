const path = require( 'path' );
const webpack = require( 'webpack' );
const nodeExternals = require( 'webpack-node-externals' );
const { merge } = require( 'webpack-merge' );

const base = require( './base.babel' );

module.exports = merge( base, {
  target: 'node',
  entry: {
    generator: 'src/generator/index',
  },
  output: {
    filename: '[name].min.js',
  },
  externals: [
    nodeExternals( { modulesDir: path.join( process.cwd(), 'node_modules' ) } ),
  ],
  resolve: {
    extensions: [ '.wasm', '.mjs', '.js', '.ts', '.json' ],
  },
  module: {
    rules: [ require( './rules/mjs.auto' ), require( './rules/babel.loader' )() ],
  },
  plugins: [ new webpack.DefinePlugin( {} ) ],
} );
