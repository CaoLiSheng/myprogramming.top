const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./base.site.v1');
const prod = require('./base.site.prod');

module.exports = merge(base, prod, {
  output: {
    path: path.join(process.cwd(), 'public', 'v1'),
  },
  module: {
    rules: [require('./rules/babel.loader')({ react: true })],
  },
});
