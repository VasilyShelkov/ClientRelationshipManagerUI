const { resolve } = require('path');
const webpack = require('webpack');
const Merge = require('merge');
const CommonConfig = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env =>
  Merge(CommonConfig(), {
    entry: {
      main: ['babel-polyfill', resolve(__dirname, '../src/app/app.js')],
      vendor: [
        'apollo-client',
        'axios',
        'babel-polyfill',
        'lodash',
        'react',
        'react-apollo',
        'react-dom',
        'react-redux',
        'react-router',
        'react-router-redux',
        'redux',
        'redux-form',
        'redux-form-material-ui',
        'material-ui',
        'moment'
      ]
    },
    output: {
      publicPath: '/',
      path: resolve(__dirname, '../dist'),
      filename: '[name].[chunkhash].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env)
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs'
      }),
      new ExtractTextPlugin('index.css')
    ]
  });
