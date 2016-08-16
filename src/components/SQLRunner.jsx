import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';

import '../css/tab_content.css';

function getStatus(state) {
    return {
        tab_index: state.active_tab,
        sql_command: state.tabs[state.active_tab].sql_runner.command,
        sql_result: state.tabs[state.active_tab].sql_runner.result
    }
}

function dispatchStatus(dispatch) {
    return {
        setSqlCommand: function (tabIndex, sql_command) {
            dispatch({
                type: 'SET_SQL_COMMAND',
                tabIndex: tabIndex,
                sql_command: sql_command
            });
        },
        setSqlResult: function (tabIndex, sql_result) {
            dispatch({
                type: 'SET_SQL_RESULT',
                tabIndex: tabIndex,
                sql_result: sql_result
            });
        }
    }
}

class SQLRunner extends React.Component {
    runSqlCommand() {
        this.props.knex.raw(this.props.sql_command)
            .then((resp) => {
                console.log("RESP", this);
                if (resp.length > 0) {
                    this.props.setSqlResult(this.props.tab_index, resp);
                    this.forceUpdate();
                }
            });
    }

    sqlCommandOnChange(e){
        this.props.setSqlCommand(this.props.tab_index, e.target.value)
    }


    render() {
        var result = undefined;
        if (this.props.sql_result.length > 0){
            result = (
                <div className="table-content">
                    <table className="ui celled padded table">
                        <thead>
                        <tr>
                            {_.map(this.props.sql_result[0], (value, key) => {
                                return (
                                    <th key={value + key}>{key}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(this.props.sql_result, (row, index) => {
                            return (
                                <tr key={index}>
                                    {_.map(row, (value) => {
                                        return (
                                            <td key={value}>{value}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div className="sqlrunner">
                <div className="ui form sql-command-input">
                    <textarea rows="4" value={this.props.sql_command}
                              onChange={this.sqlCommandOnChange.bind(this)}/>
                </div>
                <div className="run-button-container">
                    <button className="ui primary button run-button" onClick={this.runSqlCommand.bind(this)}>Run
                    </button>
                </div>
                {result}
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(SQLRunner);


