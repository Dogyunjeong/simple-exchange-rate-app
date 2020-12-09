/* eslint-disable */

module.exports = {
  webpack: function(config, env) {
    // ...add your webpack config
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        transpileOnly: true,
        configFile: 'tsconfig.json',
      },
    })
    return config;
  },
}