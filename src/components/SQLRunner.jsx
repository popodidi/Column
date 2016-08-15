import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';

import '../css/table_content.css';

function getStatus(state) {
    return {
        knex: state.knex,
        sql_command: state.sql_runner.sql_command,
        result: state.sql_runner.result
    }
}

function dispatchStatus(dispatch) {
    return {
        setSqlCommand: function (e) {
            dispatch({
                type: 'SET_SQL_COMMAND',
                sql_command: e.target.value
            });
        },
        setSqlResult: function (result) {
            dispatch({
                type: 'SET_SQL_RESULT',
                result: result
            });
        }
    }
}

class SQLRunner extends React.Component {
    runSqlCommand() {
        console.log(this.props.sql_command);
        this.props.knex.raw(this.props.sql_command)
            .then((resp) => {
                console.log("RESP", resp);

                if (resp.length > 0) {
                    this.props.setSqlResult(resp);
                }
            });
    }


    render() {
        return (
            <div className="sqlrunner">
                <div className="ui form sql-command-input">
                    <textarea rows="2" value={this.props.sql_command}
                              onChange={this.props.setSqlCommand.bind(this)}></textarea>
                </div>
                <div className="run-button-container">
                    <button className="ui primary button run-button" onClick={this.runSqlCommand.bind(this)}>Run
                    </button>
                </div>
                <div className="table-content">
                    <table className="ui celled padded table">
                        <thead>
                        <tr>
                            {_.map(this.props.result[0], (value, key) => {
                                return (
                                    <th key={key}>{key}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(this.props.result, (row, index) => {
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
            </div>
        );
    }
}

export default connect(getStatus, dispatchStatus)(SQLRunner);


