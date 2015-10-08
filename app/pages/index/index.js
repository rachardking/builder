import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { message, Modal } form 'antd';
import Menu from '../../components/Menu/index';
import Stage from '../../components/Stage/index';
import editor from '../../components/Editor/index';
import './index.less'


class Index extends Component {

    render() {
        { errorMessage } = this.props.product;
        //errorMessage && message.success(errorMessage);
        return (
            <header>
                <a className="logo"></a>
                <Menu></Menu>
            </header>
            <div className="main-wrapper">
                <section className="main">
                    <Stage></Stage>
                </section>
                <section className="side">
                    <Operate></Operate>
                </section>
            </div>
            <Modal title="第一个 Modal" visible={errorMessage} confirmLoading={this.state.confirmLoading}>
                {errorMessage}
            </Modal>
        )      
    }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

export default connect(mapStateToProps)(Index);