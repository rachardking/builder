{
    "methodName": "commitComponentCode",
    "data": {
        "component": {
            "sourceCode": "\n'use strict';\n\nvar React = require('react');\n\nvar ButtonToolbar = require('react-bootstrap').ButtonToolbar;\n\nvar ButtonGroup = require('react-bootstrap').ButtonGroup;\n\nvar Button = require('react-bootstrap').Button;\n\n\nvar AaaActions = require('../../actions/ReactBootstrap/AaaActions.js');\n\nvar AaaStore = require('../../stores/ReactBootstrap/AaaStore.js');\n\nvar Aaa = React.createClass({\n\n    getDefaultProps: function() {\n        return {};\n    },\n\n    getInitialState: function() {\n        return AaaStore.model;\n    },\n\n    componentDidMount() {\n        this.unsubscribe = AaaStore.listen(this.onModelChange);\n    },\n\n    componentWillUnmount() {\n        this.unsubscribe();\n    },\n\n    onModelChange: function(model) {\n        this.setState(model);\n    },\n\n    render: function() {\n        return (\n            <ButtonToolbar {...this.props}>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n                <ButtonGroup>\n                    <Button>\n                        <span>Left</span>\n                    </Button>\n                    <Button>\n                        <span>Middle</span>\n                    </Button>\n                    <Button>\n                        <span>Right</span>\n                    </Button>\n                </ButtonGroup>\n            </ButtonToolbar>\n            );\n    }\n});\n\nmodule.exports = Aaa;\n",
            "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/components/ReactBootstrap/Aaa.js",
            "relativeFilePathInIndex": "../../src/components/ReactBootstrap/Aaa.js",
            "componentName": "Aaa",
            "groupName": "ReactBootstrap"
        },
        "modules": {
            "action": {
                "sourceCode": "'use strict';\n\nvar Reflux = require('reflux');\n\nvar AaaActions = Reflux.createActions([\n    'testAction'\n]);\n\nmodule.exports = AaaActions;\n",
                "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/actions/ReactBootstrap/AaaActions.js",
                "name": "AaaActions"
            },
            "store": {
                "sourceCode": "'use strict';\n\nvar Reflux = require('reflux');\nvar AaaActions = require('../../actions/ReactBootstrap/AaaActions.js');\n\nvar defaultModel = {\n};\n\nvar AaaStore = Reflux.createStore({\n    model: defaultModel,\n    listenables: AaaActions,\n\n    onTestAction: function() {\n        this.trigger(this.model);\n    }\n\n});\n\nmodule.exports = AaaStore;",
                "outputFilePath": "/Users/jinzhiwei/Desktop/king/project/ui2/src/stores/ReactBootstrap/AaaStore.js",
                "name": "AaaStore"
            }
        }
    }
}