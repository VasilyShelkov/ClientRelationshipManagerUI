const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      resolve(__dirname, '../src/app/app.js'),
    ],
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
    ],
  },
  output: {
    publicPath: '/',
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [resolve(__dirname, '../src')],
      use: 'babel-loader',
    }, {
      test: /\.(css|scss)$/,
      include: [resolve(__dirname, '../src')],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        loader: 'css-loader?sourceMap!sass-loader?sourceMap'
      })
    }, {
      test: /\.(graphql|gql)$/,
      include: [resolve(__dirname, '../src')],
      use: 'graphql-tag/loader'
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
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
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
    new ExtractTextPlugin('index.css'),
  ],
};
