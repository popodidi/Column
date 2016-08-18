import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';
import $ from 'jquery';

import TabContent from './TabContent.jsx';
import SQLRunner from './SQLRunner.jsx';

import '../css/tab.css';

function getStatus(state) {
    return {
        index: state.active_tab,
        tab: state.tabs[state.active_tab],
        sql_runner: state.sql_runner
    }
}

function dispatchStatus(dispatch) {
    return {
        updateTab: function (index, tab) {
            dispatch({
                type: 'UPDATE_TAB',
                index: index,
                tab: tab
            })
        }
    }
}

class Tab extends React.Component {
    selectTable(tableIndex, e) {
        const newTab = Object.assign({}, this.props.tab, {selected_table: this.props.tab.tables[tableIndex]});
        this.props.updateTab(this.props.index, newTab);
    }
    
    goToSqlRunner(){
        const newTab = Object.assign({}, this.props.tab, {selected_table: this.props.sql_runner});
        this.props.updateTab(this.props.index, newTab);
    }

    render() {
        const {knex, selected_table} = this.props.tab;
        return (
            <div className="ui grid tab">
                <div className="row">
                    <div className="two wide column">
                        <div className="ui secondary vertical menu tab-side-menu">
                            <div style={{textAlign: 'center'}}>
                            <button className="ui secondary button" onClick={this.goToSqlRunner.bind(this)}>SQL Runner</button>
                                </div>
                            <div className="ui divider"></div>
                            {_.map(this.props.tab.tables, (table, tableIndex) => {
                                const className = table == this.props.tab.selected_table ? "active item" : "item";
                                return (

                                    <a className={className} key={tableIndex}
                                       onClick={this.selectTable.bind(this, tableIndex)}>
                                        {table}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                    <div className="fourteen wide stretched column tab-content">
                        {selected_table == this.props.sql_runner?
                            <SQLRunner knex={knex}/> : <TabContent tableName={selected_table} knex={knex}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(Tab);