const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(process.cwd(), 'public', 'v1'),
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      __posts_root__: JSON.stringify('../posts/'),
    }),
  ],
};
