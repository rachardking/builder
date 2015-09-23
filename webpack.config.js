var Webpack = require("webpack");
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var ExtractTextPlugin = require("extract-text-webpack-plugin");




module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        path.resolve(appPath, 'main.js')
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            //exclude: /node_modules/,
            loader:  'style!css'
            //loader:  ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.(eot|woff|ttf|svg|png|jpg)([\?]?.*)$/,
            exclude: /node_modules/,
            loader: 'url-loader'
        }, {
            test: /\.less$/,
            //exclude: /node_modules/,
            loader: "style-loader!css-loader!less-loader"
        }]
    },

    plugins: [new Webpack.HotModuleReplacementPlugin()],

    externals: [{
        "jquery": "jQuery"
    }]
};