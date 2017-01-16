var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill','./lib/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    public: '0.0.0.0:3000',
    inline: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react', 'stage-0' ] }
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'config': JSON.stringify(config)
    }),
    new webpack.ProvidePlugin({
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
