var React = require('react');
<% _.forEach(component.imports, function(item, index) { %>var <%=item.name%> = require('<%=item.relativeSource%>')<%if(item.member){%>.<%=item.member%><%}%>;<% }); %>
<% _.forOwn(modules, function(module, name) { %>var <%=module.name%> = require('<%=module.relativeFilePath%>');<% });%>

var <%=component.componentName%> = React.createClass({

    getDefaultProps: function () {
        return {<%= processDefaultProps(component.model.props) %>};
    },

    getInitialState: function () {
        return <%=modules.store.name%>.model;
    },

    componentDidMount(){
        this.unsubscribe = <%=modules.store.name%>.listen(this.onModelChange);
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    onModelChange: function (model) {
        this.setState(model);
    },

    render: function(){
        return (
            <<%=component.model.type%> {...this.props} >
<%         if(component.model.children && component.model.children.length > 0) {
                _.forEach(component.model.children, function(child) { %>
                    <%=processChild(child)%>
<%              });
           } else { %>
                {this.props.children}
<%         } %>
<%         if(component.model.text && component.model.text.length > 0){%>
                <%= component.model.text %>
<%         } %>
           </<%= component.model.type %>>
        );
    }
});

module.exports = <%=component.componentName%>;