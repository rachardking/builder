var webpack = require("webpack");

module.exports = [{
    name: "browser",
    entry: {
        main: './public/app.js'
    },
    output: {
        path: './public',
        filename: 'app-bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(eot|woff|ttf|svg|png|jpg)([\?]?.*)$/,
            exclude: /node_modules/,
            loader: 'url-loader'
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader!less-loader"
        }]
    },

    externals: [{
        "jquery": "jQuery"
    }]
}, {
    name: "server",
    entry: {
        api: './app.js'
    },
    output: {
        path: './',
        filename: 'app-bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    externals: /^[a-z\-0-9_]+$/

}];