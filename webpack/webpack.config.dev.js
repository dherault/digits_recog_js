'use strict';

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

const config = require('./config');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    `webpack-hot-middleware/client?path=${config.url}__webpack_hmr`,
    path.resolve(__dirname, '../src/main.js')
  ],
  output: {
    path: path.resolve(__dirname, '../www'),
    filename: 'bundle.js',
    publicPath: config.url
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({ // http://mts.io/2015/04/08/webpack-shims-polyfills/
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react', 'react-hmre']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: webpack => [
    postcssImport({
      addDependencyTo: webpack
    }),
    precss, 
    autoprefixer, 
  ],
};
