// var path = require('path')
// var express = require('express')
// var stormpath = require('express-stormpath')
// var bodyParser = require('body-parser')
// var webpack = require('webpack')
// var webpackDevMiddleware = require("webpack-dev-middleware")
// var webpackHotMiddleware = require("webpack-hot-middleware")
// var config = require('./webpack.config')
// var compiler = webpack(config)

// var app = express()

// app.use(webpackDevMiddleware(compiler, {
//   hot: true,
//   filename: 'bundle.js',
//   publicPath: config.output.publicPath,
//   stats: {
//     colors: true,
//   },
//   historyApiFallback: true,
// }));
 
// app.use(webpackHotMiddleware(compiler, {
//   log: console.log,
//   path: '/__webpack_hmr',
//   heartbeat: 10 * 1000,
// }));


// // app.use(require('webpack-dev-middleware')(compiler, {
// //   noInfo: true,
// //   publicPath: config.output.publicPath
// // }))

// // app.use(require('webpack-hot-middleware')(compiler))

// app.use(stormpath.init(app, {
//   web: {
//     produces: ['application/json']
//   }
// }))

// app.get('/css/main.css', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build/css/main.css'))
// })

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build/index.html'))
// })

// app.on('stormpath.ready', function () {
//   app.listen(3000, 'localhost', function (err) {
//     if (err) return console.error(err)
//   })
//   console.log('Listening at hattp://localhoast:3000')
// })