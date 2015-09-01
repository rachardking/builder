class Project {
    openLocalProject(options){
        let response = {};
        return this.setupProject(options)
            .then( () => {
                let htmlDirPath = this.storageManager.getProjectBuildDirPath();
                let refinedDirPath = htmlDirPath.replace(/\\/g, '/').substr(0, 250);
                let htmlURLPrefix = servicePath + refinedDirPath;
                this.htmlURLPrefix = htmlURLPrefix;
                response.htmlURLPrefix = htmlURLPrefix;
                response.htmlForDesk = 'PageForDesk.html';
                this.addProjectStaticRoute(htmlURLPrefix, htmlDirPath);
            })
            .then( () => {
                return this.storageManager.readProjectJsonModel()
                    .then(jsonModel => {
                        response.model = jsonModel;
                    });
            })
            .then( () => {
                return this.indexManager.getComponentsTree()
                    .then( componentsTree => {
                        response.componentsTree = componentsTree;
                    });
            })
            .then( () => {
                return this.storageManager.compileProjectResources();
            })
            .then( () => {
                return response;
            });
    }

    createProject(options){ 


    }

    saveProjectModel(options){
        return this.storageManager.writeProjectJsonModel(options.model);
    }

    watchLocalProject(options) {
        return this.storageManager.watchProjectResources((err, data) => {
            let response = {};
            if (err) {
                this.socketClient.emit('compilerWatcher.errors', err);
            } else {
                response = _.extend(response, data);
                this.indexManager.getComponentsTree()
                    .then(componentsTree => {
                        response.componentsTree = componentsTree;
                        setTimeout( () => {
                            this.socketClient.emit('compilerWatcher.success', response);
                        }, 100);

                    })
                    .catch(err => {
                        setTimeout( () => {
                            this.socketClient.emit('compilerWatcher.errors', err);
                        }, 100);
                    });
            }
        });
    }

    stopWatchLocalProject(options){
        return this.storageManager.stopWatchProjectResources();
    }

    readProjectDocument(options){
        return this.indexManager.getComponentsNames()
            .then( componentsNames => {
                return this.storageManager.readProjectDocument(componentsNames);
            });
    }

    writeProjectDocument(options){
        return this.validator.validateOptions(options, ['projectDocument'])
            .then( () => {
                return this.storageManager.writeProjectDocument(options.projectDocument);
            });
    }

}