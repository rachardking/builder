import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';


import './stage.less';


class Stage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

        var domNode = React.findDOMNode(this);
        domNode.onload = (function(){
            this._renderFrameContent();
        }).bind(this);

       
    }

    componentWillUnmoun(){
        this.unsubscribe();
        if(this.frameEndpoint) {
            this.frameEndpoint.onComponentDidUpdate = null;
            this.frameEndpoint.onComponentWillUpdate = null;
            this.frameEndpoint  = null;
        }
    }

    _renderFrameContent() {

        var domNode = React.findDOMNode(this);
        var doc = domNode.contentDocument;
        var win = domNode.contentWindow;
        if (doc.readyState === 'complete') {

            this._mapDomNodes();
            
            this._changeFrameContent();

            if(domNode.contentWindow && domNode.contentWindow.document && domNode.contentWindow.document.body){
                domNode.contentWindow.document.body.scrollTop = this.contentScrollTop;
            } else if(domNode.contentDocument && domNode.contentDocument.documentElement){
                domNode.contentDocument.documentElement.scrollTop = this.contentScrollTop;
            }
        }
    }

    _mapDomNodes(){
        Repository.resetCurrentPageDomNodes();
        React.addons.TestUtils.findAllInRenderedTree(this.frameEndpoint.Page,
            function(component){
                var props = component.props;
                //console.log(props);
                if(props && props['data-umyid'] && props['data-umyid'].length > 0){
                    var dataumyid = props['data-umyid'];
                    var existingPageNode = Repository.getCurrentPageDomNode(dataumyid);
                    if(existingPageNode && !existingPageNode.domElement){
                        var domNode = this.frameEndpoint.Page.findDOMNodeInPage(component);
                        if(domNode){
                            Repository.setCurrentPageDomNode(dataumyid, domNode);
                            $(domNode).on("mousedown.umy", (function(_dataumyid){
                                return function(e){
                                    if(!e.metaKey && !e.ctrlKey){
                                        e.stopPropagation();
                                        e.preventDefault();
                                        //console.log(e.metaKey);
                                        DeskPageFrameActions.deselectComponent();
                                        DeskPageFrameActions.selectComponentById(_dataumyid);
                                    }
                                };
                            })(dataumyid));
                            //console.log("Set domNode into Repository: %o, %o", dataumyid, component.getDOMNode());
                        }
                    }
                }
                return true;
            }.bind(this)
        );
        DeskPageFrameActions.didRenderPageFrame();
    }

    render() {
        const {stageUrl} = this.props;

        return (<iframe {...this.props} src={stageUrl} />); 
    }
}

Stage.propTypes = { initialCount: PropTypes.number };
Stage.defaultProps = { initialCount: 0 };

export default Stage;