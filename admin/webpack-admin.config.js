const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    appClient: path.join(__dirname, 'src', 'app-client.js'),
    appBundle: path.join(__dirname, 'src', 'app-bundle.js')
  },
  output: {
    path: path.join(__dirname, 'static', 'js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  resolve: {
    modules: ['node_modules']
  }
};
