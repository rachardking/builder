import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import Index from './pages/index/Index';
import configureStore from './store/configureStore';

window.__endPointPage__ = React.render(
    <Provider store={store}>
        {() => <Index /> }
    </Provider>,
    document.getElementById('root')
);
