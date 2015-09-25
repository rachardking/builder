{
    "methodName": "getGeneratorList",
    "data": {}
}



{
    "data": [{
        "dirPath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/react",
        "filePath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/react/generator.json",
        "config": {
            "name": "react",
            "description": "Generate React component source code including children.",
            "component": {
                "destDirPath": "src/components/{groupName}",
                "fileExtension": "js",
                "script": "Component.js"
            }
        }
    }, {
        "dirPath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/react-no-children",
        "filePath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/react-no-children/generator.json",
        "config": {
            "name": "react-no-children",
            "description": "Generate React component source code excluding children.",
            "component": {
                "destDirPath": "src/components/{groupName}",
                "fileExtension": "js",
                "script": "Component.js"
            }
        }
    }, {
        "dirPath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/reflux",
        "filePath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/reflux/generator.json",
        "config": {
            "name": "reflux",
            "description": "Generate React component + Reflux store and actions source code. Component will include children",
            "component": {
                "destDirPath": "src/components/{groupName}",
                "fileExtension": "js",
                "script": "Component.js"
            },
            "modules": [{
                "id": "action",
                "destDirPath": "src/actions/{groupName}",
                "name": "{componentName}Actions",
                "script": "Actions.js",
                "validateJS": true
            }, {
                "id": "store",
                "destDirPath": "src/stores/{groupName}",
                "name": "{componentName}Store",
                "script": "Store.js",
                "validateJS": true
            }]
        }
    }]
}