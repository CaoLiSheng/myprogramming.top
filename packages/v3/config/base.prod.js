module.exports = {
  mode: 'production',
  output: {
    publicPath   : './',
    filename     : '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  plugins: [
    require ( './vars/site.prod' ),
  ]
};
