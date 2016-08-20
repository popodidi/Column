import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

// Compenent
import Main from './components/Main.jsx';

import {Provider} from 'react-redux';

import store from './redux/store.jsx';

import '../semantic/dist/semantic.js';
import '../semantic/dist/semantic.css';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('App')
);
