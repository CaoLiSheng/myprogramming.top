const webpack = require('webpack');

module.exports = {
  mode: 'production',
  output: {
    publicPath: './',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __posts_root__: JSON.stringify('../posts/'),
    }),
  ],
};
