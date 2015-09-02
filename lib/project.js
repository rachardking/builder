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

    doGeneration(projectModel, indexObj, pageContents){

        let generatedObject = {
            pages: []
        };

        let projectDataObj = this.createProjectDataObject(projectModel, indexObj, pageContents);

        let pageTemplateFilePath = path.join(this.previewTemplateDirPath, 'Page.tpl');
        let htmlTemplateFilePath = path.join(this.previewTemplateDirPath, 'Html.tpl');
        let resourcesTemplateFilePath = path.join(this.previewTemplateDirPath, 'Resources.tpl');
        let pageTemplate = null;
        let htmlTemplate = null;
        let resourcesTemplate = null;
        return this.fileManager.readFile(pageTemplateFilePath)
            .then( fileData => {
                pageTemplate = _.template(fileData);
            })
            .then( () => {
                return this.fileManager.readFile(htmlTemplateFilePath)
                    .then( fileData => {
                        htmlTemplate = _.template(fileData);
                    });
            })
            .then( () => {
                return this.fileManager.readFile(resourcesTemplateFilePath)
                    .then( fileData => {
                        resourcesTemplate = _.template(fileData);
                    });
            })
            .then( () => {
                generatedObject.outputDirPath = projectDataObj.outputDirPath;
                projectDataObj.pages.map( (page, index) => {
                    var htmlPageName = page.isIndexPage ? 'index' : page.pageName;
                    generatedObject.pages.push({
                        pageOutputFilePath: path.join(projectDataObj.outputDirPath, page.pageName + '.js'),
                        pageSourceCode: pageTemplate(page),
                        htmlOutputFilePath: path.join(projectDataObj.outputDirPath, htmlPageName  + '.html'),
                        htmlSourceCode: htmlTemplate(page),
                        bundleFileName: page.pageName
                    });
                });
                generatedObject.resources = {
                    outputFilePath: path.join(projectDataObj.outputDirPath, 'resources.js'),
                    sourceCode: resourcesTemplate(projectDataObj.resources),
                    bundleFileName: 'resources.bundle.js'
                };
                return generatedObject;
            });
    }

    commitGeneration(generatedObj){

        var nodeModulesPath = path.join(this.projectDirPath, 'node_modules');

        let sequence = Promise.resolve();

        sequence = sequence.then(() => {
            return this.fileManager.removeFile(generatedObj.outputDirPath);
        });

        sequence = sequence.then( () => {
            return this.fileManager.ensureFilePath(generatedObj.resources.outputFilePath)
                .then(() => {
                    return this.fileManager.writeFile(
                        generatedObj.resources.outputFilePath,
                        generatedObj.resources.sourceCode,
                        true
                    );
                })
                .then( () => {
                    return this.compiler.compileNotOptimized(
                        generatedObj.resources.outputFilePath,
                        generatedObj.outputDirPath,
                        generatedObj.resources.bundleFileName,
                        nodeModulesPath
                    );
                });
        });

        generatedObj.pages.map( (page, index) => {
            sequence = sequence.then(() => {
                return this.fileManager.ensureFilePath(page.pageOutputFilePath)
                    .then(() => {
                        return this.fileManager.writeFile(
                            page.pageOutputFilePath,
                            page.pageSourceCode,
                            true
                        );
                    })
                    .then( () => {
                        return this.fileManager.ensureFilePath(page.htmlOutputFilePath)
                    })
                    .then(() => {
                        return this.fileManager.writeFile(
                            page.htmlOutputFilePath,
                            page.htmlSourceCode,
                            false
                        );
                    });
            });
        });

        sequence = sequence.then( () => {
            var entries = {};
            generatedObj.pages.map( (page, index) => {
                entries[page.bundleFileName] = page.pageOutputFilePath;
            });
            return this.compiler.compileNotOptimized(
                entries,
                generatedObj.outputDirPath,
                '[name].bundle.js',
                nodeModulesPath,
                true
            );
        });

        sequence = sequence.then( () => {

            return 'live-preview/index.html'
        });

        return sequence;
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