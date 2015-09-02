import fs from 'fs-extra';

/*
    元数据
    模板
    编译
    写入
    
*/


class Storage {
    compile(entryFilePath, outputDirPath, outputFileName, nodeModulesDir){
        return new Promise((resolve, reject) => {

            let compiler = webpack({
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
            });
            compiler.run( (err, stats) => {
                let jsonStats = stats.toJson({
                    hash: true
                });
                //console.log(jsonStats.hash);
                let lastWatcherHash = jsonStats.hash;
                //if(jsonStats.errors.length > 0)
                //    console.log(jsonStats.errors);
                //if(jsonStats.warnings.length > 0)
                //    console.log(jsonStats.warnings);
                //console.log(stats);
                if(err) {
                    reject(err);
                } else if(jsonStats.errors.length > 0){
                    let messages = [];
                    _.each(jsonStats.errors, (item) => {
                        let messageArray = item.split('\n');
                        //console.log('Error message: ' + messageArray);
                        messages.push(messageArray);
                    });
                    //console.log(jsonStats.errors);
                    reject(messages);
                } else {
                    resolve();
                }
            });

        });
    }

    writeSourceFile(filePath, fileData){
        return this.fileManager.writeFile(filePath, fileData, false);
    }

    readSourceFile(filePath){
        return this.fileManager.readFile(filePath);
    }

    readServerConfig(){
        return this.fileManager.readJson(this.serverConfigFilePath).then( jsonObj => {
            return jsonObj;
        });
    }

    writeServerConfig(configObj){
        return this.fileManager.writeJson(this.serverConfigFilePath, configObj);
    }

    readProjectConfig(){
        return this.fileManager.readJson(this.configFilePath);
    }

    writeProjectConfig(options){
        return this.fileManager.writeJson(this.configFilePath, options);
    }

    compileProjectResources() {
        return this.installPackages()
            .then( () => {
                let pageForDeskFilePath = path.join(this.sourceDirPath, 'PageForDesk.js');
                var nodeModulesPath = path.join(this.projectDirPath, 'node_modules');
                //console.log('Start compiling in ' + this.sourceDirPath);
                return this.compiler.stopWatchCompiler().then( () => {
                    return this.compiler.compile(pageForDeskFilePath, this.buildDirPath, 'bundle.js', nodeModulesPath);
                });
            });
    }

    watchProjectResources(callback){
        return this.compiler.stopWatchCompiler()
            .then( () => {
                let pageForDeskFilePath = path.join(this.sourceDirPath, 'PageForDesk.js');
                var nodeModulesPath = path.join(this.projectDirPath, 'node_modules');

                return this.compiler.watchCompiler(
                    pageForDeskFilePath, this.buildDirPath, 'bundle.js', nodeModulesPath, callback
                )
            });
    }

    stopWatchProjectResources(){
        return this.compiler.stopWatchCompiler();
    }
}