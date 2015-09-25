import React from 'react';
import {Menu,  SubMenu} from 'antd';


export default var Menu = React.createClass({
    getInitialState() {
        return {
        current: 'mail'
        }
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    },
    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="mail">
                    <i className="anticon anticon-mail"></i>导航一
                </Menu.Item>
                <Menu.Item key="app">
                <i className="anticon anticon-appstore"></i>back
                </Menu.Item>
                <SubMenu title={<span><i className="anticon anticon-setting"></i>new</span>}>
                    <Menu.Item key="setting:1">component</Menu.Item>
                    <Menu.Item key="setting:2">reduces</Menu.Item>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a href="http://www.alipay.com/" target="_blank">github</a>
                </Menu.Item>
            </Menu>
        )
  }
});