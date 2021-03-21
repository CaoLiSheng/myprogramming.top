module.exports = {
  test: /\.(eot|woff|woff2|ttf|svg|jpe?g|png|gif|wav|ico)$/,
  loader: 'url-loader?limit=2048&name=[name]-[hash:10].[ext]',
};
