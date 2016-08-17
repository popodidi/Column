import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import Intro from './Intro.jsx';
import Tab from './Tab.jsx';

import _ from 'lodash';
import $ from 'jquery';

import '../css/main.css';

function getStatus(state) {
    return {
        active_tab: state.active_tab,
        tabs: state.tabs,
        default_tab: state.default_tab
    }
}

function dispatchStatus(dispatch) {
    return {
        addTab: function () {
            dispatch({
                type: 'ADD_TAB'
            })
        },
        setActiveTab: function (active_tab) {
            dispatch({
                type: 'SET_ACTIVE_TAB',
                active_tab: active_tab
            });
        }
    }
}

class Main extends React.Component {

    selectTab(index, e) {
        this.props.setActiveTab(index);
    }


    render() {
        return (
            <div className="main">
                <div className="ui top attached tabular menu">
                    {_.map(this.props.tabs, (tab, index) => {
                        const className = index == this.props.active_tab ? "active item" : "item";
                        return (
                            <a key={'tab'+ index} className={className}
                               onClick={this.selectTab.bind(this, index)}>{tab.db_name}
                                <i className="remove circle icon"/>
                            </a>
                        )
                    })}
                    <div className="right menu">
                        <a className="item" onClick={this.props.addTab}>
                            New Tabkk
                        </a>
                    </div>
                </div>
                <div className="ui bottom attached segment">
                    {this.props.tabs[this.props.active_tab].db_name === this.props.default_tab.db_name ?
                    <Intro /> : <Tab />}
                </div>
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(Main);