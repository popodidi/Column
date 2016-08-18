import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/mysql';
import 'brace/theme/github';
import 'brace/ext/language_tools';

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
                console.log("RESP", resp);
                if (resp.length > 0) {
                    this.props.setSqlResult(this.props.tab_index, resp);
                    this.forceUpdate();
                }
            });
    }

    sqlCommandOnChange(newValue) {
        this.props.setSqlCommand(this.props.tab_index, newValue)
    }


    render() {
        var result = undefined;
        if (this.props.sql_result.length > 0) {
            const rows = this.props.sql_result;
            const ths = _.map(rows[0], (value, key) => {
                return key;
            });
            const thead = _.map(ths, (th, index) => {
                return (
                    <th key={"head cell" + th + index}>{th}</th>
                )
            });

            const tbody = _.map(rows, (row, rowIndex) => {
                return (
                    <tr key={"body cell " +rowIndex}>
                        {_.map(ths, (th, thIndex) => {
                            const tdValue = row[th];
                            return (
                                <td key={"body cell: {\n" + "ROW:" + rowIndex + ",\n COLUMN: " + thIndex + "\n}"}>{tdValue}</td>
                            )
                        })}
                    </tr>
                )
            });
            result = (
                <div className="table-content">
                    <table className="ui celled padded table">
                        <thead>
                        <tr>
                            {thead}
                        </tr>
                        </thead>
                        <tbody>
                        {tbody}
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
            <div className="sqlrunner">
                <AceEditor
                    mode="mysql"
                    theme="github"
                    name="sql_command"
                    showPrintMargin={false}
                    fontSize={17}
                    editorProps={{$blockScrolling: true}}
                    value={this.props.sql_command}
                    onChange={this.sqlCommandOnChange.bind(this)}
                    height="100px"
                    width="100%"
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                />
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


