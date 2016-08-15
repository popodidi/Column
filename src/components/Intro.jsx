import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';

import '../css/intro.css';

function getStatus(state) {
    return {
        db_directory: state.db_directory,
        tables: state.tables
    }
}

function dispatchStatus(dispatch) {
    return {
        setDbDirectory: function (db_directory) {
            dispatch({
                type: 'SET_DB_DIRECTORY',
                db_directory: db_directory
            });
        },
        setTables: function (tables) {
            dispatch({
                type: 'SET_TABLES',
                tables: tables
            });
        },
        setKnex: function (knex) {
            dispatch({
                type: 'SET_KNEX',
                knex: knex
            });
        }
    }
}

class Intro extends React.Component {

    openFile() {
        this.refs.open.click();
    }

    fileInputChange(event) {
        const reader = new FileReader();
        console.log(event.target.files[0].path);
        this.props.setDbDirectory(event.target.files[0].path);
    }

    start() {

        var knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: this.props.db_directory
            }
        });
        this.props.setKnex(knex);
        knex.select().from('sqlite_master')
            .then((rows) => {
                var tables = [];
                _.forIn(rows, (value, key) => {
                    tables = _.concat(tables, [value.name]);
                });
                this.props.setTables(tables);
            }).then(() => {
            hashHistory.push('/main')
        });
    }

    render() {
        return (
            <div className="intro">
                <input ref="open" type="file" className="ui button" style={{display:'none'}}
                       onChange={this.fileInputChange.bind(this)}/>
                <div className="ui action input db-browser">
                    <input type="text" placeholder="Search..." value={this.props.db_directory} readOnly/>
                    <button className="ui button" onClick={this.openFile.bind(this)}>Browse</button>
                </div>
                <button className="massive ui button go-button" onClick={this.start.bind(this)}>START</button>
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(Intro);