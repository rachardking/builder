
import _ from 'lodash';
import path from 'path';
import FileManager from './FileManager.js';
import IndexManager from './IndexManager.js';
import * as modelParser from './ModelParser.js';
import * as pathResolver from './PathResolver.js';
import * as formatter from './FileFormatter.js';
import ProjectCompiler from './ProjectCompiler.js';

const configFileName = 'react-ui-builder.json';
const templateDirName = 'templates';
const storageDirName = '.data';
const builderDirName = '.builder';
const buildDirName = 'build';
const generatorsDirName = 'generators';
const sourceDirName = 'src';
const scriptsDirName = 'scripts';
const docsDirName = 'docs';
const fileConfigName = 'config.json';
const indexFileName = 'index.js';
const npmPackageFileName = 'package.json';
const siteTemplateDirName = 'static-site';

class StaticSiteManager {


    constructor(serverDirPath){

        this.serverDirPath = serverDirPath;
        this.serverConfigFilePath = path.join(this.serverDirPath, configFileName);
        this.serverTemplateDirPath = path.join(this.serverDirPath, templateDirName);
        this.packageFilePath = path.join(this.serverDirPath, npmPackageFileName);
        this.storageDirPath = path.join(this.serverDirPath, storageDirName);
        this.siteTemplateDirPath = path.join(this.serverTemplateDirPath, siteTemplateDirName);

        this.fileManager = new FileManager();
        this.compiler = new ProjectCompiler();

    }

    setProjectDirPath(projectDirPath){
        this.projectDirPath = projectDirPath;
        this.builderDirPath = path.join(projectDirPath, builderDirName);
        this.buildDirPath = path.join(this.builderDirPath, buildDirName);
        this.generatorsDirPath = path.join(this.builderDirPath, generatorsDirName);
        this.sourceDirPath = path.join(this.builderDirPath, sourceDirName);
        this.indexFilePath = path.join(this.sourceDirPath, indexFileName);
        this.docsDirPath = path.join(this.builderDirPath, docsDirName);
        this.scriptsDirName = scriptsDirName;
        this.configFilePath = path.join(this.builderDirPath, fileConfigName);
    }

    createPageDataObject(pageModel, indexObj){
        let dataObj = {
            model: pageModel,
            pageName: pageModel.pageName,
            pageTitle: pageModel.pageTitle,
            pageMetaInfo: pageModel.pageMetaInfo,
            imports: []
        };

        let modelComponentMap = modelParser.getModelComponentMap(_.extend(pageModel, {type: pageModel.pageName}));
        if(indexObj.groups){

            _.forOwn(indexObj.groups, (value, prop) => {
                if(value.components && value.components.length > 0){
                    value.components.map((componentInIndex) => {
                        if(modelComponentMap[componentInIndex.name]){
                            dataObj.imports.push({
                                name: componentInIndex.name,
                                source: componentInIndex.source,
                                member: componentInIndex.member
                            });
                        }
                    });
                }
            });
        }

        return dataObj;
    }

    createResourcesDataObject(indexObj){
        let dataObj = {

            requires: []
        };
        if(indexObj.requires && indexObj.requires.length > 0){
            indexObj.requires.map( require => {
                dataObj.requires.push({
                        source: require.source
                });
            });
        }
        return dataObj;
    }

    createProjectDataObject(projectModel, destDirPath, indexObj, pageContents){
        let projectDataObj = {
            staticDirPath: path.join(this.projectDirPath, destDirPath),
            outputDirPath: path.join(this.projectDirPath, destDirPath, 'src'),
            bundleDirPath: path.join(this.projectDirPath, destDirPath, 'public'),
            indexFilePath: this.indexFilePath,
            pages:[]
        };
        let resources = this.createResourcesDataObject(indexObj);
        if(projectModel && projectModel.pages && projectModel.pages.length > 0){
            projectModel.pages.map( (page, index) => {
                if(pageContents[page.pageName]){
                    let pageDataObject = this.createPageDataObject(page, indexObj);
                    pageDataObject.htmlContent = pageContents[page.pageName].htmlContent;
                    pageDataObject.isIndexPage = pageContents[page.pageName].isIndexPage;
                    pageDataObject.resources = resources;
                    projectDataObj.pages.push(pageDataObject);
                }
            });
        } else {
            throw Error('Project does not have pages.');
        }
        projectDataObj = pathResolver.resolveFromProjectPerspective(projectDataObj);
        return projectDataObj;
    }

    doGeneration(projectModel, destDirPath, indexObj, pageContents){

        let generatedObject = {
            pages: []
        };

        let projectDataObj = this.createProjectDataObject(projectModel, destDirPath, indexObj, pageContents);

        let pageTemplateFilePath = path.join(this.siteTemplateDirPath, 'Page.tpl');
        let htmlTemplateFilePath = path.join(this.siteTemplateDirPath, 'Html.tpl');
        let pageTemplate = null;
        let htmlTemplate = null;
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
                generatedObject.staticDirPath = projectDataObj.staticDirPath;
                generatedObject.bundleDirPath = projectDataObj.bundleDirPath;
                projectDataObj.pages.map( (page, index) => {
                    var htmlPageName = page.isIndexPage ? 'index' : page.pageName;
                    generatedObject.pages.push({
                        pageOutputFilePath: path.join(projectDataObj.outputDirPath, page.pageName + '.js'),
                        pageSourceCode: pageTemplate(page),
                        htmlOutputFilePath: path.join(projectDataObj.bundleDirPath, htmlPageName  + '.html'),
                        htmlSourceCode: htmlTemplate(page),
                        bundleFileName: page.pageName
                    });
                });
                return generatedObject;
            });
    }

    commitGeneration(generatedObj){

        var nodeModulesPath = path.join(this.projectDirPath, 'node_modules');

        let sequence = Promise.resolve();

        sequence = sequence.then(() => {
            return this.fileManager.removeFile(generatedObj.staticDirPath);
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
            return this.compiler.compileOptimized(
                entries,
                generatedObj.bundleDirPath,
                '[name].bundle.js',
                nodeModulesPath,
                true
            );
        });

        return sequence;
    }

}

export default StaticSiteManager;




 doGeneration(componentModel, generatorName, userInputObj){
        return this.createDataObject(componentModel, generatorName, userInputObj)
            .then( dataObj => {

                let generatedObj = {
                    component: {},
                    modules: {}
                };
                let sequence = Promise.resolve();

                sequence = sequence.then( () => {
                    let componentData = pathResolver.resolveFromComponentPerspective(dataObj);
                    return this.generateText(componentData.component.generatorScriptPath, componentData)
                        .then( sourceCode => {

                            generatedObj.component.sourceCode = sourceCode;
                            generatedObj.component.outputFilePath = componentData.component.outputFilePath;
                            generatedObj.component.relativeFilePathInIndex = componentData.component.relativeFilePathInIndex;
                            generatedObj.component.componentName = componentData.component.componentName;
                            generatedObj.component.groupName = componentData.component.groupName;
                        });
                });


                _.forOwn(dataObj.modules, (value, prop) => {
                    sequence = sequence.then( () => {
                        try{
                            let moduleData = pathResolver.resolveFromModulePerspective(dataObj, prop);
                            return this.generateText(value.generatorScriptPath, moduleData)
                                .then(sourceCode => {
                                    generatedObj.modules[prop] = {
                                        sourceCode: sourceCode,
                                        outputFilePath: moduleData.modules[prop].outputFilePath,
                                        name: moduleData.modules[prop].name
                                    };
                                });
                        } catch (e){
                            throw Error(e);
                        }
                    });
                });

                sequence = sequence.then(() => {
                    return this.fileManager.removeFile(path.join(this.projectDirPath, '.errors'))
                        .then( () => {
                            return generatedObj;
                        });
                });

                return sequence;
            });
    }


generateText(scriptFilePath, dataObj, formatJS = true){
        return new Promise( (resolve, reject) => {
            try{
                let scriptRealPath = require.resolve(scriptFilePath);
                if(scriptRealPath && require.cache[scriptRealPath]){
                    delete require.cache[scriptRealPath];
                }
                let module = require(scriptFilePath);
                module(
                    dataObj,
                    sourceCode => {
                        if (formatJS) {
                            let prevResult = sourceCode;
                            try {
                                let result = formatter.formatJsFile(sourceCode);
                                resolve(result);
                            } catch (e) {
                                let errorFilePath = path.join(this.projectDirPath, '.errors', 'generators', path.basename(scriptFilePath));
                                this.fileManager.ensureFilePath(errorFilePath)
                                    .then(() => {
                                        this.fileManager.writeFile(errorFilePath, prevResult)
                                    })
                                    .catch(err => {
                                        console.error('Writing bad file. Error: ' + err);
                                    });
                                reject('Validation failed. ' + e + '. Generator script file path: ' + scriptFilePath);
                            }
                        } else {
                            resolve(sourceCode);
                        }
                    },
                    err => {
                        reject('Processing generator\'s method is failed. Error: ' + err + '. File path: ' + scriptFilePath);
                    }
                );
            } catch(e){
                reject('Loading generator\'s script is failed. Error: ' + e + '. File path: ' + scriptFilePath);
            }
        });