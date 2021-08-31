module.exports = {
  test : /\.pug$/,
  oneOf: [
    {
      resourceQuery: /lang=pug/,
      use          : [ 'pug-plain-loader' ],
    },
  ],
};
