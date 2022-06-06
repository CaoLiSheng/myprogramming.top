const path = require ( 'path' );

module.exports = {
  test   : /(\.s?css$|\/css\?.*)/,
  include: [ path.join ( process.cwd (), 'src' ) ],
  use    : [ 'vue-style-loader', 'css-loader', 'sass-loader' ],
};
