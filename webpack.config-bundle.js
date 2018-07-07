const path = require('path')

module.exports = {
  mode: 'production',
  entry: ['./src/bundle.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'asciify_aalib.bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, "src")
      ],
      exclude: [
        path.resolve(__dirname, "node_modules")
      ],
    }]
  }
};