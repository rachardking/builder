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