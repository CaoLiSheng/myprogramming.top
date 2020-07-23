const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./base.site');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.join(process.cwd(), 'public'),
  },
  plugins: [],
});
