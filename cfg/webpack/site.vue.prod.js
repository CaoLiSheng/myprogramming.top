const path = require('path');
const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const base = require('./base.site.vue');
const dev = require('./base.site.prod');

module.exports = merge(base, dev, {
  output: {
    path: path.join(process.cwd(), 'build/v2/prod'),
  },
});
