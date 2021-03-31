module.exports = function factory ( configs = {} ) {
  const { dev, react, tsAllExts } = configs;

  const extPlugins = dev ? [ 'react-hot-loader/babel' ] : [];
  const extPresets = react ? [ '@babel/preset-react' ] : [];
  const babelPrestTs = tsAllExts
    ? [ '@babel/preset-typescript', { allExtensions: true } ]
    : '@babel/preset-typescript';

  return {
    test: /\.(j|t)s(x)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
          [ '@babel/preset-env', { modules: false, targets: { browsers: 'last 2 versions' } } ],
          babelPrestTs,
          ...extPresets,
        ],
        plugins: [
          [ '@babel/plugin-proposal-decorators', { legacy: true } ],
          [ '@babel/plugin-proposal-class-properties', { loose: true } ],
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-transform-runtime',
          ...extPlugins,
        ],
      },
    },
  };
};
