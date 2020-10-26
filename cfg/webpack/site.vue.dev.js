const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./base.site.vue');
const dev = require('./base.site.dev');

module.exports = merge(base, dev, {
  output: {
    path: path.join(process.cwd(), 'build/v2/dev'),
  },
});
