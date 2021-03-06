import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import './editor.less';

class Editor extends Component {

    _checkEditor: function (sourceCode) {
        if (!this.editor) {
            //
            var domNode = React.findDOMNode(this);
            this.editor = ace.edit(domNode);
            //this.editor.getSession().setMode("ace/mode/jsx");
            this.editor.getSession().setMode(this.props.mode);
            this.editor.getSession().setTabSize(4);
            if(this.props.isReadOnly){
                this.editor.setReadOnly(true);
            }
            this.editor.$blockScrolling = Infinity;
            this.editor.getSession().on('change', this.handleChange);
            //this.editor.setTheme("ace/theme/tomorrow_night");
        }
        if (sourceCode) {
            this.editor.getSession().setValue(sourceCode);
        }
        this.editor.focus();
        this.editor.navigateFileEnd();
    }

    getSourceCode: function(){
        if(this.editor){
            return this.editor.getSession().getValue();
        }
        return null;
    }

    handleChange: function(e){
        if(this.props.onChangeText){
            this.props.onChangeText(this.editor.getSession().getValue());
        }
    }

    componentDidMount: function(){
        this._checkEditor(this.props.sourceCode);
    }

    componentDidUpdate: function(){
        this._checkEditor(this.props.sourceCode);
    },

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.sourceName !== this.props.sourceName;
    }

    componentWillUnmount: function(){
        if(this.editor){
            this.editor.destroy();
            this.editor = null;
        }
    }

    render: function() {
        return (
            <div {...this.props}></div>
        );
    }

}


operate.propTypes = { initialCount: PropTypes.number };
operate.defaultProps = { mode: "ace/mode/javascript" };

export default Editor;
