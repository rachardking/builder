class Project {

     downloadProject(options) {
        let _options = {
            id: options.projectId,
            projectDirPath: options.dirPath,
            projectId: options.projectId,
            packageFileName: appPackFileName
        };
        return this.validator.validateEmptyDir(_options.projectDirPath)
            .then(() => {
                return this.setupProject(_options);
            })
            .then( result => {
                return this.clientManager.downloadGalleryFile(_options);
            })
            .then( fileBody => {
                return this.storageManager.writeProjectBinaryFile(appPackFileName, fileBody);
            })
            .then( () => {
                return this.storageManager.unpackProjectFile(appPackFileName);
            })
            .then( () => {
                return 'OK';
            });

    }
    
    setupProject(options){
        return this.validator.validateOptions(options, 'projectDirPath')
            .then( () => {
                if(this.indexManager){
                    delete this.indexManager;
                }
                this.indexManager = new IndexManager(options.projectDirPath);
                if(this.generatorManager){
                    delete this.generatorManager;
                }
                this.generatorManager = new GeneratorManager(options.projectDirPath);

                this.storageManager.setProjectDirPath(options.projectDirPath);
                this.staticSiteManager.setProjectDirPath(options.projectDirPath);
                this.livePreviewManager.setProjectDirPath(options.projectDirPath);

                return 'OK';
            });
    }

     setProjectProxy(options){
        return this.storageManager.loadProxyURL(options)
            .then( proxyURL => {

                this.proxyURL = proxyURL;

                if(!this.proxy){
                    this.proxy = httpProxy.createProxyServer({});
                    this.proxy.on('error', (err, req, res) => {
                        console.log('Proxy server error connecting to ' + this.proxyURL + req.url);
                    });
                    //
                    this.app.all('/*', (req, res, next) => {
                        if (req.url.indexOf(servicePath) === 0) {
                            next('route');
                        } else {
                            if(this.proxyURL && this.proxyURL.length > 0){
                                this.proxy.web(req, res, { target: this.proxyURL });
                            } else {
                                next('route');
                            }
                        }
                    });
                   
                }
                return { proxyURL: this.proxyURL };
            });
    }
    
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

    addProjectStaticRoute(htmlUrlPrefix, htmlDirPath){
        this.app.use(htmlUrlPrefix, express.static(htmlDirPath));
    }

    createProject(options){
        return this.validator.validateOptions(options,
            ['projectName', 'projectDescription', 'projectLicense', 'files', 'pageContents', 'projectModel'])
            .then( () => {
                let projectGallery = {
                    projectName: options.projectName,
                    description: options.projectDescription,
                    license: options.projectLicense
                };
                let entries = [];
                if(options.files && options.files.length > 0){
                    options.files.map(file => {
                        if(file.checked === true){
                            entries.push(file.name);
                        }
                    });
                }

                const staticContentDirName = '__static_preview_content';
                const appDestFileName = '__app.tar.gz';
                const staticDestFileName = '__preview.tar.gz';
                let projectData = null;
                let applicationPackageFilePath = null;
                let previewPackageFilePath = null;

                return this.clientManager.createProject(projectGallery)
                    .then( projectObj => {
                        projectData = projectObj;
                        return this.indexManager.initIndex()
                            .then( indexObj => {
                                return this.staticSiteManager.doGeneration(
                                    options.projectModel, staticContentDirName, indexObj, options.pageContents)
                                    .then( generatedObj => {
                                        return this.staticSiteManager.commitGeneration(generatedObj);
                                    });
                            })
                    })
                    .then( () => {
                        return this.storageManager.copyProjectReadmeToStaticContent(staticContentDirName);
                    })
                    .then( () => {
                        return this.storageManager.packProjectFiles(entries, appDestFileName);
                    })
                    .then( filePath => {
                        applicationPackageFilePath = filePath;
                        return this.storageManager.packProjectFiles([staticContentDirName], staticDestFileName);
                    })
                    .then( filePath => {
                        previewPackageFilePath = filePath;
                        return this.clientManager.uploadProjectFiles({
                            projectId: projectData.id,
                            filePaths: [applicationPackageFilePath, previewPackageFilePath]
                        });
                    })
                    .then( () => {
                        return this.storageManager.removeProjectFile(staticContentDirName)
                            .then( () => {
                                return this.storageManager.removeProjectFile(appDestFileName);
                            })
                            .then( () => {
                                return this.storageManager.removeProjectFile(staticDestFileName);
                            });
                    })
                    .catch( err => {
                        return this.storageManager.removeProjectFile(staticContentDirName)
                            .then( () => {
                                return this.storageManager.removeProjectFile(appDestFileName);
                            })
                            .then( () => {
                                return this.storageManager.removeProjectFile(staticDestFileName);
                            })
                            .then( () => {
                                throw Error(err);
                            });
                    });
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