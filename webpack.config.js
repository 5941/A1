var path = require('path');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var DEBUG = !argv.release;


module.exports = {
  entry: [
    './src/app/app.js'
  ],
  watch: true,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.js"
  },
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'sourcemap' : false,
  stats: {
    colors: true,
    reasons: DEBUG
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.module.js', '.routes.js']
  },
  externals: [
    {
      'lodash': '_',
      'angular': 'angular',
      'angular-ui-router':'"ui.router"'
    }
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ].concat(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]),
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.html$/,
        loader: 'raw',
        exclude: /node_modules/
      }
    ]
  }
};
