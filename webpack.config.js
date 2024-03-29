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
  // module: {
  //   loaders: [
  //     {
  //       test: path.join(__dirname, 'src'),
  //       loader: 'babel-loader',
  //       query: {
  //         cacheDirectory: 'babel_cache',
  //         presets: ['react', 'es2015']
  //       }
  //     }
  //   ]
  // },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      } 
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // })
  ]
};
