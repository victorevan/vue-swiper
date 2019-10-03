module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js$/],
          test: /\.js?$/,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    }
  }
};
