const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const base = require('./base.site');

module.exports = merge(base, {
  entry: {
    app: 'src/www/vue/app.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /lang=pug/,
            use: ['pug-plain-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            resourceQuery: /lang=styl(us)?/,
            use: [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
              'stylus-loader',
            ],
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
});
