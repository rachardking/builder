import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Tabs, TabPane } form 'antd';


import './tree.less';


class Tree extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        <div>
            <div classNames='btns'></div>
        </div>
    }
}

Tree.propTypes = { initialCount: PropTypes.number };
Tree.defaultProps = { initialCount: 0 };


export default connect(mapStateToProps)(Tree);
