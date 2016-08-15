import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

// Compenent
import Intro from './components/Intro.jsx';
import Main from './components/Main.jsx';
import TableContent from './components/TableContent.jsx';
import SQLRunner from './components/SQLRunner.jsx';

import {Provider} from 'react-redux';

import store from './redux/store.jsx';

import '../semantic/dist/semantic.js';
import '../semantic/dist/semantic.css';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Base}>
                <IndexRoute component={Intro}/>
                <Route path="/intro" component={Intro}/>
                <Route path="/main" component={Main}>
                    <IndexRoute component={SQLRunner}/>
                    <Route path="/main/table/:tableName" component={TableContent} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('App')
);

class Base extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
