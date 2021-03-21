module.exports = {
  test: /\.styl(us)?$/,
  oneOf: [
    {
      resourceQuery: /lang=styl(us)?/,
      use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
    },
  ],
};
