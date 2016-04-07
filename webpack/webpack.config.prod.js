'use strict';

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
  // devtool: 'source-map',
  entry: [
    path.resolve(__dirname, '../src/main.js')
  ],
  output: {
    path: path.resolve(__dirname, '../www/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({ // http://mts.io/2015/04/08/webpack-shims-polyfills/
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      comments: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
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
