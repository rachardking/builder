{
    "methodName": "generateComponentCode",
    "data": {
        "componentGroup": "ReactBootstrap",
        "componentName": "Aaa",
        "componentModel": {
            "type": "ButtonToolbar",
            "props": {},
            "children": [{
                "type": "ButtonGroup",
                "children": [{
                    "type": "Button",
                    "children": [{
                        "type": "span",
                        "text": "Left",
                        "props": {}
                    }],
                    "props": {}
                }, {
                    "type": "Button",
                    "children": [{
                        "type": "span",
                        "text": "Middle",
                        "props": {}
                    }],
                    "props": {}
                }, {
                    "type": "Button",
                    "children": [{
                        "type": "span",
                        "text": "Right",
                        "props": {}
                    }],
                    "props": {}
                }],
                "props": {}
            }, {
                "type": "ButtonGroup",
                "children": [{
                    "type": "Button",
                    "children": [{
                        "type": "span",
                        "text": "Left",
                        "props": {}
                    }],
                    "props": {}
                }, {
                    "type": "Button",
                    "children": [{
                        "type": "span",
                        "text": "Middle",
                        "props": {}
                    }],
                    "props": {}
                }, {
                    "type": "Button",
                    "children": [{
                        "type": "span",
                        "text": "Right",
                        "props": {}
                    }],
                    "props": {}
                }],
                "props": {}
            }]
        },
        "generatorName": "reflux"
    }
}



{
    "data": {
        "component": {
            "sourceCode": "\n'use strict';\n\nvar React = require('react');\n\nvar ButtonToolbar = require('react-bootstrap').ButtonToolbar;\n\nvar ButtonGroup = require('react-bootstrap').ButtonGroup;\n\nvar Button = require('react-bootstrap').Button;\n\n\nvar BbbbActions = require('../../actions/ReactBootstrap/BbbbActions.js');\n\nvar BbbbStore = require('../../stores/ReactBootstrap/BbbbStore.js');\n\nvar Bbbb = React.createClass({\n\n    getDefaultProps: function() {\n        return {};\n    },\n\n    getInitialState: function() {\n        return BbbbStore.model;\n    },\n\n    componentDidMount() {\n        this.unsubscribe = BbbbStore.listen(this.onModelChange);\n    },\n\n    componentWillUnmount() {\n        this.unsubscribe();\n    },\n\n    onModelChange: function(model) {\n        this.setState(model);\n    },\n\n    render: function() {\n        return (\n            <ButtonToolbar {...this.props}>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n            </ButtonToolbar>\n            );\n    }\n});\n\nmodule.exports = Bbbb;\n",
            "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap/Bbbb.js",
            "relativeFilePathInIndex": "../../src/components/ReactBootstrap/Bbbb.js",
            "componentName": "Bbbb",
            "groupName": "ReactBootstrap"
        },
        "modules": {
            "action": {
                "sourceCode": "'use strict';\n\nvar Reflux = require('reflux');\n\nvar BbbbActions = Reflux.createActions([\n    'testAction'\n]);\n\nmodule.exports = BbbbActions;\n",
                "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/actions/ReactBootstrap/BbbbActions.js",
                "name": "BbbbActions"
            },
            "store": {
                "sourceCode": "'use strict';\n\nvar Reflux = require('reflux');\nvar BbbbActions = require('../../actions/ReactBootstrap/BbbbActions.js');\n\nvar defaultModel = {\n};\n\nvar BbbbStore = Reflux.createStore({\n    model: defaultModel,\n    listenables: BbbbActions,\n\n    onTestAction: function() {\n        this.trigger(this.model);\n    }\n\n});\n\nmodule.exports = BbbbStore;",
                "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/stores/ReactBootstrap/BbbbStore.js",
                "name": "BbbbStore"
            }
        }
    }
}