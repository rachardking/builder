onDownloadProject: function(options){
        var dirPath = null;
        if(options.dirPath && options.dirPath.trim().length > 0) {
            dirPath = options.dirPath.trim();
        }
        if(dirPath){
            this.model.downloadProjectDirPath = options.dirPath;
            ModalProgressActions.showModalProgress('npm modules are being installed. Please wait, it will take some time...', 400);
            Server.invoke('downloadProject',
                {
                    dirPath: options.dirPath,
                    projectId: this.model.cloneProjectId
                },
                function(errors){
                    this.model.errors = errors;
                    this.model.stage = 'downloadProjectForm';
                    this.trigger(this.model);
                }.bind(this),
                function(response){
                    this.onOpenLocalProject({
                        dirPath: options.dirPath
                    });
                }.bind(this)
            );
        } else {
            this.model.errors = ['Please specify local directory path'];
            this.trigger(this.model);
        }
    },

 onOpenLocalProject: function(options){
        var dirPath = null;
        if(options.dirPath && options.dirPath.trim().length > 0) {
            dirPath = options.dirPath.trim();
        }
        if(dirPath) {

            ModalProgressActions.showModalProgress('Project is being compiled and loaded. Please wait...', 400);

            Server.invoke('openLocalProject', { projectDirPath: dirPath },
                function(errors){

                    this.model.errors = errors;
                    this.trigger(this.model);
                }.bind(this),
                function(response){

                    Repository.setCurrentProjectModel(response.model);
                    Repository.setHtmlForDesk(response.htmlURLPrefix + '/' + response.htmlForDesk);
                    Repository.setCurrentPageModelByIndex(0);
                    Repository.setComponentsTree(response.componentsTree);
                    //Repository.setCallbackAfterProjectModelRenew(function(){
                    //    Server.invoke('saveProjectModel', {
                    //        model: Repository.getCurrentProjectModel()
                    //    }, function(err){
                    //        console.error(JSON.stringify(err));
                    //    }, function(response){
                    //        //console.log('Project model is saved successfully');
                    //    });
                    //});

                    this.model.errors = null;

                    this.model.builderConfig.recentProjectDirs = this.model.builderConfig.recentProjectDirs || [];
                    var foundIndex = -1;
                    this.model.builderConfig.recentProjectDirs.map( function(item, index) {
                        if(item === dirPath){
                            foundIndex = index;
                        }
                    });
                    if(foundIndex >= 0){
                        this.model.builderConfig.recentProjectDirs.splice(foundIndex, 1);
                    }
                    this.model.builderConfig.recentProjectDirs.splice(0, 0, dirPath);

                    this.onStoreBuilderConfig(this.model.builderConfig);

                    Server.onSocketEmit('compilerWatcher.success', function(data){
                        Repository.setComponentsTree(data.componentsTree);
                        PanelAvailableComponentsActions.refreshComponentList();
                    });

                    Server.invoke('setProjectProxy', {}, function(err){}, function(response){});
                    Server.invoke('watchLocalProject', {}, function(err){}, function(response){});

                    Server.invoke('readProjectDocument', {},
                        function(err) { console.log(err); },
                        function(response){
                            Repository.setCurrentProjectDocument(response);
                        }
                    );

                    this.onGoToDeskPage();


                }.bind(this)
            );
        } else {
            this.model.errors = ['Please specify local project directory path'];
            this.trigger(this.model);
        }
    },