const { merge } = require('webpack-merge');

const base = require('./base.site');

module.exports = merge(base, {
  entry: {
    app: 'src/www/react/app',
  },
});
