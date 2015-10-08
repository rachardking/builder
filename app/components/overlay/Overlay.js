import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Tabs, TabPane } form 'antd';


import './overlay.less';


class Overlay extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        <div>
            <div classNames='btns'></div>
        </div>
    }
}

Overlay.propTypes = { initialCount: PropTypes.number };
Overlay.defaultProps = { initialCount: 0 };


export default connect(mapStateToProps)(Overlay);
