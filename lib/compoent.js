class Compnent {
    
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
}