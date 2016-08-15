import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';

import '../css/table_content.css';

function getStatus(state) {
    return {
        knex: state.knex
    }
}

class TableContent extends React.Component {
    constructor(props){
        super(props);
        this.selecFromTable(props.params.tableName);
    }

    componentWillReceiveProps(nextProps) {
        this.selecFromTable(nextProps.params.tableName)
    }

    selecFromTable(tableName){
        this.props.knex.select().from(tableName)
            .then((rows) => {
                if (rows.length > 0) {
                    this.th = _.map(rows[0], (value, key) => {
                        return key;
                    });
                    this.td = rows;
                    this.forceUpdate();
                }
            });
    }

    render() {
        return (
            <div className="table-content">
                <table className="ui celled padded table">
                    <thead>
                    <tr>
                        {_.map(this.th, (th) => {
                            return (
                                <th key={th}>{th}</th>
                            )
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(this.td, (row, index) => {
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
        );
    }
}

// export default TableContent;
export default connect(getStatus)(TableContent);


// <div className="ui form sql-command-input">
//     <textarea rows="2"></textarea>
// </div>
// <div className="run-button-container">
//     <button className="ui primary button run-button" onClick={this.runSqlCommand.bind(this)}>Run
// </button>
// </div>