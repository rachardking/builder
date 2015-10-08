import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Tabs, TabPane } form 'antd';


import './operate.less';


class Operate extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="选项卡一" key="1">组件js，包括gallery</TabPane>
            <TabPane tab="选项卡二" key="2">组件css</TabPane>
            <TabPane tab="选项卡三" key="3">组件树</TabPane>
        </Tabs>
    }
}

Operate.propTypes = { initialCount: PropTypes.number };
Operate.defaultProps = { initialCount: 0 };


export default connect(mapStateToProps)(Operate);
