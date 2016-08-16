import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';

import '../css/intro.css';

function getStatus(state) {
    return {
        index: state.active_tab,
        tab: state.tabs[state.active_tab]
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

class Intro extends React.Component {

    openFile() {
        this.refs.open.click();
    }

    fileInputChange(event) {
        const newTab = Object.assign({}, this.props.tab, {db_directory: event.target.files[0].path});
        this.props.updateTab(this.props.index, newTab);
    }

    start() {

        var db_name = _(this.props.tab.db_directory).split('/').last()

        var knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: this.props.tab.db_directory
            }
        });

        var tables = ["sqlite_master"];
        knex.select().from('sqlite_master').where({type: 'table'})
            .then((rows) => {
                _.forIn(rows, (value, key) => {
                    tables = _.concat(tables, [value.name]);
                });
            }).then(() => {
            const newTab = Object.assign({}, this.props.tab,
                {
                    db_name: db_name,
                    knex: knex,
                    tables: tables
                });
            this.props.updateTab(this.props.index, newTab);
            hashHistory.push('/');
        });
    }

    render() {
        return (
            <div className="intro">
                <input ref="open" type="file" className="ui button" style={{display:'none'}}
                       onChange={this.fileInputChange.bind(this)}/>
                <div className="ui action input db-browser">
                    <input type="text" placeholder="Search..." value={this.props.tab.db_directory} readOnly/>
                    <button className="ui button" onClick={this.openFile.bind(this)}>Browse</button>
                </div>
                <button className="massive ui button go-button" onClick={this.start.bind(this)}>START</button>
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(Intro);