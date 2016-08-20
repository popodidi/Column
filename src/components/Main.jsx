import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import {DimmerType} from '../redux/reducer.jsx';

import Intro from './Intro.jsx';
import Tab from './Tab.jsx';
// import Dimmer from './portals/Dimmer.jsx';

import _ from 'lodash';
import $ from 'jquery';

import '../css/main.css';

function getStatus(state) {
    return {
        dimmer: state.dimmer,
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
        },
        deleteTab: function (index) {
            dispatch({
                type: 'DELETE_TAB',
                index: index
            });
        }
    }
}

class Main extends React.Component {

    componentDidMount() {
        this.loader = $(this.refs.loader).modal({
            closable: false,
            allowMultiple: false,
            onHide: _.get(this, ["onLoaderHide"], _.noop),
            onShow: _.get(this, ["onLoaderShow"], _.noop),
        }).modal({
            // blurring: true,
            inverted: true
        });
        // this.alert = $(this.refs.alert).modal({
        //     closable: false,
        //     allowMultiple: false,
        //     onHide: _.get(this, ["onAlertHide"], _.noop),
        //     onShow: _.get(this, ["onAlertShow"], _.noop),
        // });
    }


    componentDidUpdate() {
        if (this.props.dimmer.active) {
            switch (this.props.dimmer.type) {
                case DimmerType.loader:
                    this.showLoader();
                    break;
                case DimmerType.alert:
                    this.showAlert();
                    break;
            }
        } else {
            this.hideAllModal();
        }
    }

    // Tabs manipulation
    selectTab(index, e) {
        this.props.setActiveTab(index);
    }

    closeTab(index, e) {
        this.props.deleteTab(index);
        this.forceUpdate();
    }

    // Modal control
    showLoader() {
        this.loader.modal("show");
    }

    // showAlert(){
    //     this.alert.modal("show");
    // }

    hideAllModal(){
        $(this.refs.loader).modal("hide");
        // $(this.refs.alert).modal("hide");
    }

    onLoaderHide() {
        console.log("HIDE");
    }

    onLoaderShow() {
        console.log("SHOW");
    }

    // onAlertShow() {
    //     console.log("ALERT",this.prototype);
    // }


    render() {
        const {tabs} = this.props;
        var dimmerContent;
        if (this.props.dimmer.active) {
            switch (this.props.dimmer.type) {
                case DimmerType.loader:
                    dimmerContent = (<div className="ui massive loader"/>);
                    break;
                case DimmerType.alert:
                    dimmerContent = this.props.dimmer.message;
                    break;
            }
        }
        // <div ref="alert" className="ui basic modal">
        // <div className="header">Header</div>
        // <div className="content"/>
        // <div className="actions">
        // <div className="ui approve button">Approve</div>
        // <div className="ui button">Neutral</div>
        // <div className="ui cancel button">Cancel</div>
        // </div>
        // </div>
        return (
            <div className="ui main">
                <div ref="loader" className="ui basic modal">
                        <div className="ui loader"/>
                </div>

                <div className="ui top attached tabular menu tab-menu">
                    {_.map(tabs, (tab, index) => {
                        const className = index == this.props.active_tab ? "active item" : "item";
                        return (
                            <div key={'tab'+ index} className={className}>
                                <div onClick={this.selectTab.bind(this, index)}>
                                    {tab.db_name}
                                </div>
                                { this.props.tabs.length > 1 ?
                                    <i className="remove icon"
                                       onClick={this.closeTab.bind(this, index)}/> : undefined
                                }
                            </div>
                        )
                    })}
                    <div className="right menu">
                        <a className="item" onClick={this.props.addTab}>
                            <i className="add icon"/>
                            New Tab
                        </a>
                    </div>
                </div>
                <div className="ui bottom attached segment tab-body">
                    {this.props.tabs[this.props.active_tab].db_name === this.props.default_tab.db_name ?
                        <Intro /> : <Tab />}
                </div>
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(Main);