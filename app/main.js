// import 'babel-core/polyfill';

// import React from 'react';
// import { Provider } from 'react-redux';
// import App from './pages/index/index';
// import configureStore from './components/configureStore';
// import 'todomvc-app-css/index.css';

// const store = configureStore();

// React.render(
//   <Provider store={store}>
//     {() => <App />}
//   </Provider>,
//   document.getElementById('root')
// );


import React from 'react';
import { Datepicker, message } from 'antd';

var App = React.createClass({
  getInitialState() {
    return {
      date: ''
    };
  },
  handleChange(value) {
    message.info('您选择的日期是: ' + value.toString());
    this.setState({
      date: value
    });
  },
  render() {
    return <div style={{width: 400, margin: '100px auto'}}>
      <Datepicker onSelect={this.handleChange} />
      <div style={{marginTop: 20}}>当前日期：{this.state.date.toString()}</div>
    </div>;
  }
});

React.render(<App />, document.getElementById('root'));