{

    project: {

    }
    //直接在面板里放一个‘加号’
    //点击产生树，和porp state
    stage: {
        action: 'insertBefore'
        component: {
            "name": "Nav",
            "absoluteSource": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap"
        }
    }

    editor: {
        "dirPath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/reflux",
        "filePath": "/Users/jinzhiwei/Desktop/king/project/ui2/.builder/generators/reflux/generator.json",
        generators: {
           component: {
                "destDirPath": "src/components/{groupName}",
                "fileExtension": "js",
                "script": "Component.js"
           } 
        },
        component: {
            "destDirPath": "src/components/{groupName}",
            "fileExtension": "js",
            "script": "Component.js"
            "sourceCode": "\n'use strict';\n\nvar React = require('react');\n\nvar ButtonToolbar = require('react-bootstrap').ButtonToolbar;\n\nvar ButtonGroup = require('react-bootstrap').ButtonGroup;\n\nvar Button = require('react-bootstrap').Button;\n\n\nvar AaaActions = require('../../actions/ReactBootstrap/AaaActions.js');\n\nvar AaaStore = require('../../stores/ReactBootstrap/AaaStore.js');\n\nvar Aaa = React.createClass({\n\n    getDefaultProps: function() {\n        return {};\n    },\n\n    getInitialState: function() {\n        return AaaStore.model;\n    },\n\n    componentDidMount() {\n        this.unsubscribe = AaaStore.listen(this.onModelChange);\n    },\n\n    componentWillUnmount() {\n        this.unsubscribe();\n    },\n\n    onModelChange: function(model) {\n        this.setState(model);\n    },\n\n    render: function() {\n        return (\n            <ButtonToolbar {...this.props}>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n            </ButtonToolbar>\n            );\n    }\n});\n\nmodule.exports = Aaa;\n",
            "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap/Aaa.js",
            "relativeFilePathInIndex": "../../src/components/ReactBootstrap/Aaa.js",
            "componentName": "Aaa",
        },
        action: {
            "destDirPath": "src/actions/{groupName}",
            "name": "{componentName}Actions",
            "script": "Actions.js",
            "sourceCode": "\n'use strict';\n\nvar React = require('react');\n\nvar ButtonToolbar = require('react-bootstrap').ButtonToolbar;\n\nvar ButtonGroup = require('react-bootstrap').ButtonGroup;\n\nvar Button = require('react-bootstrap').Button;\n\n\nvar AaaActions = require('../../actions/ReactBootstrap/AaaActions.js');\n\nvar AaaStore = require('../../stores/ReactBootstrap/AaaStore.js');\n\nvar Aaa = React.createClass({\n\n    getDefaultProps: function() {\n        return {};\n    },\n\n    getInitialState: function() {\n        return AaaStore.model;\n    },\n\n    componentDidMount() {\n        this.unsubscribe = AaaStore.listen(this.onModelChange);\n    },\n\n    componentWillUnmount() {\n        this.unsubscribe();\n    },\n\n    onModelChange: function(model) {\n        this.setState(model);\n    },\n\n    render: function() {\n        return (\n            <ButtonToolbar {...this.props}>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n            </ButtonToolbar>\n            );\n    }\n});\n\nmodule.exports = Aaa;\n",
            "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap/Aaa.js",
            "relativeFilePathInIndex": "../../src/components/ReactBootstrap/Aaa.js",
            "componentName": "Aaa",
        },
        style: {
            "destDirPath": "src/actions/{groupName}",
            "name": "{componentName}Actions",
            "script": "Actions.js",
            "sourceCode": "\n'use strict';\n\nvar React = require('react');\n\nvar ButtonToolbar = require('react-bootstrap').ButtonToolbar;\n\nvar ButtonGroup = require('react-bootstrap').ButtonGroup;\n\nvar Button = require('react-bootstrap').Button;\n\n\nvar AaaActions = require('../../actions/ReactBootstrap/AaaActions.js');\n\nvar AaaStore = require('../../stores/ReactBootstrap/AaaStore.js');\n\nvar Aaa = React.createClass({\n\n    getDefaultProps: function() {\n        return {};\n    },\n\n    getInitialState: function() {\n        return AaaStore.model;\n    },\n\n    componentDidMount() {\n        this.unsubscribe = AaaStore.listen(this.onModelChange);\n    },\n\n    componentWillUnmount() {\n        this.unsubscribe();\n    },\n\n    onModelChange: function(model) {\n        this.setState(model);\n    },\n\n    render: function() {\n        return (\n            <ButtonToolbar {...this.props}>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n            </ButtonToolbar>\n            );\n    }\n});\n\nmodule.exports = Aaa;\n",
            "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap/Aaa.js",
            "relativeFilePathInIndex": "../../src/components/ReactBootstrap/Aaa.js",
            "componentName": "Aaa",
        },
        reduce: {
            "destDirPath": "src/actions/{groupName}",
            "name": "{componentName}Actions",
            "script": "Actions.js",
            "sourceCode": "\n'use strict';\n\nvar React = require('react');\n\nvar ButtonToolbar = require('react-bootstrap').ButtonToolbar;\n\nvar ButtonGroup = require('react-bootstrap').ButtonGroup;\n\nvar Button = require('react-bootstrap').Button;\n\n\nvar AaaActions = require('../../actions/ReactBootstrap/AaaActions.js');\n\nvar AaaStore = require('../../stores/ReactBootstrap/AaaStore.js');\n\nvar Aaa = React.createClass({\n\n    getDefaultProps: function() {\n        return {};\n    },\n\n    getInitialState: function() {\n        return AaaStore.model;\n    },\n\n    componentDidMount() {\n        this.unsubscribe = AaaStore.listen(this.onModelChange);\n    },\n\n    componentWillUnmount() {\n        this.unsubscribe();\n    },\n\n    onModelChange: function(model) {\n        this.setState(model);\n    },\n\n    render: function() {\n        return (\n            <ButtonToolbar {...this.props}>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n            </ButtonToolbar>\n            );\n    }\n});\n\nmodule.exports = Aaa;\n",
            "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap/Aaa.js",
            "relativeFilePathInIndex": "../../src/components/ReactBootstrap/Aaa.js",
            "componentName": "Aaa",
        }
     
    }   
    
    gallery: {
        "Navbar": {
            "name": "Navbar"
        },
        "Nav": {
            "name": "Nav",
            "absoluteSource": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap"
        },

    },

    documents: {
        "Grid": {
            "markdown": "## Bootstrap Grid\n\nBootstrap includes a responsive, mobile first fluid grid system that appropriately scales \nup to 12 columns as the device or viewport size increases. Grid systems are used for creating \npage layouts through a series of rows and columns that house your content.\n\n\n\n### Props\n\n<table border = \"1\" style=\"width: 100%\"}>\n <thead style = \"background-color: GhostWhite\">\n <tr>\n  <th style=\"padding:5px\">Name</th>\n  <th style=\"padding:5px\">Type</th>\n  <th style=\"padding:5px\">Default</th>\n  <th style=\"padding:5px\">Description</th>\n </tr>\n </thead>\n <tbody>\n  <tr>\n   <td style=\"padding:5px\"><span>`componentClass`</span><span> </span></td>\n   <td style=\"padding:5px\"><div>elementType</div></td>\n   <td style=\"padding:5px\">'div'</td>\n   <td style=\"padding:5px\"><div><p>You can use a custom element for this component</p></div></td>\n  </tr>\n  <tr>\n   <td style=\"padding:5px\"><span>`fluid`</span><span> </span></td>\n   <td style=\"padding:5px\"><div>boolean</div></td>\n   <td style=\"padding:5px\">false</td>\n   <td style=\"padding:5px\"><div><p>Turn any fixed-width grid layout into a full-width layout by this property.</p> <p>Adds <code>container-fluid</code> class.</p></div></td>\n  </tr>\n </tbody>\n</table>\n\n\n\n#### Example\n\n    {\n    \"fluid\":\"true\"\n    }\n\n\n<a href=\"http://react-bootstrap.github.io/components.html#grids\" target=\"_blank\">More about Grids</a>"
        },
        "Row": {
            "markdown": "## Row\n\nRows must be placed within a `Grid` (container (fixed-width)) or (container-fluid (full-width)) for proper alignment and padding.\nUse rows to create horizontal groups of columns. Content should be placed within columns, and only columns may be immediate children of rows.\n\n### Props\n\n<table border = \"1\" style=\"width: 100%\"}>\n <thead style = \"background-color: GhostWhite\">\n <tr>\n  <th style=\"padding:5px\">Name</th>\n  <th style=\"padding:5px\">Type</th>\n  <th style=\"padding:5px\">Default</th>\n  <th style=\"padding:5px\">Description</th>\n </tr>\n </thead>\n <tbody>\n  <tr>\n   <td style=\"padding:5px\"><span>`componentClass`</span><span> </span></td>\n   <td style=\"padding:5px\"><div>elementType</div></td>\n   <td style=\"padding:5px\">'div'</td>\n   <td style=\"padding:5px\"><div><p>You can use a custom element for this component</p></div></td>\n  </tr>\n </tbody>\n</table>\n\n---\n\n\n<a href=\"http://react-bootstrap.github.io/components.html#grids\" target=\"_blank\">More about Grids</a>\n"
        },
    }
   

}