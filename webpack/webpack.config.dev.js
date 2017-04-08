const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    '../src/app/app'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  context: resolve(__dirname, '../src'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 8080,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [resolve(__dirname, '../src'), resolve(__dirname)],
      use: 'babel-loader',
    }, {
      test: /\.(css|scss)$/,
      include: [resolve(__dirname, '../src')],
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?sourceMap!sass-loader?sourceMap'
      })
    }, {
      test: /\.(graphql|gql)$/,
      include: [resolve(__dirname, '../src')],
      use: 'graphql-tag/loader'
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: '../src/index.ejs',
    }),
    new ExtractTextPlugin('index.css'),
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
};
