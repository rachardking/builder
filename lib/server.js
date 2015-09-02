
import _ from 'lodash';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';


const builderPackFileName = 'builder.tar.gz';
const appPackFileName = '__app.tar.gz';
const modelFileName = 'model.json';
const servicePath = '/.service';

import IndexManager from './IndexManager.js';
import GeneratorManager from './GeneratorManager.js';
import StorageManager from './StorageManager.js';
import ClientManager from './ClientManager.js';
import Validator from './Validator.js';
import StaticSiteManager from './StaticSiteManager.js';
import LivePreviewManager from './LivePreviewManager.js';

class Api {

    constructor(systemEnv){

        this.systemEnv = systemEnv;

        this.storageManager = new StorageManager(this.systemEnv.serverDir);
        this.staticSiteManager = new StaticSiteManager(this.systemEnv.serverDir);
        this.livePreviewManager = new LivePreviewManager(this.systemEnv.serverDir);
        this.clientManager = new ClientManager();
        this.validator = new Validator();

        this.app = express();
        // use middleware body parsers only for certain routes, because of the proxying post request is hanging
        //this.app.use('/public', bodyParser.json(), express.static(path.join(this.systemEnv.serverDir, 'html')));
        this.app.use(express.static(__dirname + '/public'));
        this.app.post('/invoke', bodyParser.json(), (req, res) => {
            let methodName = req.body.methodName;
            let data = req.body.data || {};
            this[methodName](data)
                .then( response => {
                    res.send({ data: response });
                })
                .catch( err => {
                    let errorMessage = err.message ? err.message : err;
                    res.send({ error: true, errors: [errorMessage] });
                });
        });

        this.server = this.app.listen(2222, () => {
            console.log(
                'React UI Builder started successfully.\nPlease go to http://localhost:%d/builder',
                this.server.address().port
            );
            if(this.systemEnv.io){
                this.socket = this.systemEnv.io(this.server);
                this.socket.on('connection', socket => {
                    this.socketClient = socket;
                });
            }
        });

    }

    static initServer(options){
        let systemConfig = {
            serverDir: options.dirname,
            io: options.io
        };
        return new Api(systemConfig);
    }



    // all: config ; product: 新建 初始化 改变; gallery: 初始化;

    /*
        全局
        project
        gallery
        component
    */

    storeConfiguration(options){
        return this.storageManager.writeServerConfig(options);
    }

    readLocalConfiguration(options){
        return this.storageManager.readProjectConfig();
    }

    addProjectStaticRoute(htmlUrlPrefix, htmlDirPath){
        this.app.use(htmlUrlPrefix, express.static(htmlDirPath));
    }

    getProjectGallery(options){
        return this.clientManager.getAllProjects(options);
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

    prepareLocalProject(options){
        let response = {};
        let _options = {
            projectDirPath: options.dirPath
        };
        return this.validator.validateEmptyDir(_options.projectDirPath)
            .then( () => {
                return this.setupProject(_options);
            })
            .then( () => {
                return this.storageManager.copyProjectResources();
            })
            .then( () => {
                let htmlDirPath = this.storageManager.getProjectBuildDirPath();
                let htmlURLPrefix = servicePath + htmlDirPath.substr(0, 30);
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

    readProjectFiles(options){
        return this.storageManager.readProjectDir();
    }

    checkCreateProject(options){
        return this.validator.validateOptions(options, ['projectName'])
            .then( () => {
                return this.clientManager.checkCreateProject({ projectName: options.projectName });
            });
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
                    
            });
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

    loadComponentDefaults(options){
        return this.storageManager.readDefaults(options.componentName);
    }

    saveComponentDefaults(options){
        return this.storageManager.writeDefaults(options.componentName, options.componentOptions);
    }

    saveAllComponentDefaults(options){
        return this.storageManager.writeAllDefaults(options.componentName, options.defaults);
    }

    getGeneratorList(options){
        return this.generatorManager.getGeneratorList();
    }

    generateComponentCode(options){
        return this.validator.validateOptions(options, ['componentName', 'componentGroup', 'componentModel', 'generatorName'])
            .then( () => {
                return this.generatorManager.doGeneration(
                    options.componentModel, options.generatorName,
                    { componentName: options.componentName, groupName: options.componentGroup }
                )
                    .then( generatedObj => {
                        return generatedObj;
                    });
            });
    }

    commitComponentCode(options){
        return this.generatorManager.commitGeneration(options);
    }

    rewriteComponentCode(options){
        return this.validator.validateOptions(options, ['filePath', 'sourceCode'])
            .then( () => {
                return this.storageManager.writeSourceFile(options.filePath, options.sourceCode);
            });
    }

    readComponentCode(options){
        return this.validator.validateOptions(options, ['filePath'])
            .then( () => {
                return this.storageManager.readSourceFile(options.filePath);
            });

    }

    readComponentDocument(options){
        return this.validator.validateOptions(options, ['componentName'])
            .then( () => {
                return this.storageManager.readComponentDocument(options.componentName);
            });
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

    generateStaticSite(options){
        return this.validator.validateOptions(options, ['projectModel', 'pageContents', 'destDirName'])
            .then( () => {
                return this.indexManager.initIndex()
                    .then( indexObj => {
                        return this.staticSiteManager.doGeneration(
                            options.projectModel, options.destDirName, indexObj, options.pageContents
                        )
                            .then( generatedObj => {
                                //console.log(JSON.stringify(generatedObj, null, 4));

                                return this.staticSiteManager.commitGeneration(generatedObj);

                            });
                    });
            });
    }

    generateLivePreview(options){
        return this.validator.validateOptions(options, ['projectModel'])
            .then( () => {
                return this.livePreviewManager.doGeneration(options.projectModel);
            }).then( () => {
                return this.htmlURLPrefix + '/live-preview';
            });
    }



}

export default Api;
