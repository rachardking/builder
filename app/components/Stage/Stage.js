
import React from 'react';


export default var Stage = React.createClass({

    render: function() {
        return (<iframe {...this.props} src={Repository.getHtmlForDesk()} />);
    },

    componentDidMount: function() {

        var domNode = React.findDOMNode(this);
        domNode.onload = (function(){
            this._renderFrameContent();
        }).bind(this);

        Server.onSocketEmit('compilerWatcher.errors', function(data){
            var messages = [];
            _.each(data, function(item){
                _.each(item, function(message){
                    messages.push(message);
                });
            });
            this._showModalMessageArray(messages);
        }.bind(this));

        Server.onSocketEmit('compilerWatcher.success', function(data){
            domNode.src = Repository.getHtmlForDesk();
        }.bind(this));
    },

    componentWillUnmount: function(){
        this.unsubscribe();
        if(this.frameEndpoint) {
            this.frameEndpoint.onComponentDidUpdate = null;
            this.frameEndpoint.onComponentWillUpdate = null;
            this.frameEndpoint  = null;
        }
    },

    _renderFrameContent: function() {

        var domNode = React.findDOMNode(this);
        var doc = domNode.contentDocument;
        var win = domNode.contentWindow;
        if(doc.readyState === 'complete' && win.endpoint && win.endpoint.Page) {

            //console.log('Page is loaded...');

            Repository.setCurrentPageDocument(doc);
            Repository.setCurrentPageWindow(win);

            //var cssList = Common.getCSSClasses(doc);
            //console.log(JSON.stringify(cssList, null, 4));

            this.frameEndpoint = win.endpoint;
            this.frameEndpoint.onComponentDidUpdate = function(){
                this._mapDomNodes();
            }.bind(this);
            this.frameEndpoint.onComponentWillUpdate = function(){
                DeskPageFrameActions.deselectComponent();
            };
            this._changeFrameContent();

            this._hideModalProgress();

            if(domNode.contentWindow && domNode.contentWindow.document && domNode.contentWindow.document.body){
                domNode.contentWindow.document.body.scrollTop = this.contentScrollTop;
            } else if(domNode.contentDocument && domNode.contentDocument.documentElement){
                domNode.contentDocument.documentElement.scrollTop = this.contentScrollTop;
            }
        }
    },

    _changeFrameContent: function(){
        if(this.frameEndpoint){
            React.addons.TestUtils.findAllInRenderedTree(this.frameEndpoint.Page,
                function(component){
                    var props = component.props;
                    if(props && props['data-umyid'] && props['data-umyid'].length > 0){
                        var domNode = this.frameEndpoint.Page.findDOMNodeInPage(component);
                        if(domNode){
                            $(domNode).off("mousedown.umy");
                        }
                    }
                    return true;
                }.bind(this)
            );

            this.frameEndpoint.replaceState(Repository.getCurrentPageModel());
        }
    },

    _mapDomNodes: function(){
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


});
