//@import
import _ from 'lodash';
var a = require('a');



var HelloMessage = React.createClass({
  render: function() {
  	
  	//@render 
    return (<div>
    		Hello {this.props.name}

    	</div>);
  }
});

function BooleanTypeAnnotation() {
  this.push("bool");
}

/**
 * Prints BooleanLiteralTypeAnnotation.
 */

function BooleanLiteralTypeAnnotation(node) {
  this.push(node.value ? "true" : "false");
}

//@export
export default HelloMessage;