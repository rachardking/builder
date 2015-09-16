{
    path: {

    },

    structure: {

    },

    webpack: {
        name: "browser",
        entry: [entryFilePath],
        output: {
            path: outputDirPath,
            filename: outputFileName
        },
        debug: true,
        module: {
            loaders: [
                { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' },
                { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
                { test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, exclude: /node_modules/, loader: 'url-loader' }
            ]
        },
        //resolveLoader: { root: path.join(__dirname, "node_modules") },
        resolveLoader: {
            root: [nodeModulesDir]
        },
        externals: {
            // require("jquery") is external and available
            //  on the global var jQuery
            "jquery": "jQuery"
        }
    },

    project: {
        
    }
}