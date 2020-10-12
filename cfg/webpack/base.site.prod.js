const webpack = require('webpack');

module.exports = {
  mode: 'production',
  output: {
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      __posts_root__: JSON.stringify('../posts/'),
    }),
  ],
};
