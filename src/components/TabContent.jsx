import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import dispatchers from '../redux/dispatchers.jsx';
import {DimmerType} from '../redux/reducer.jsx';

import _ from 'lodash';

import '../css/tab_content.css';

function getStatsus(state) {
    return {}
}

function dispatchStatus(dispatch) {
    return {
        // setLoading: dispatchers.setLoading.bind(undefined, dispatch),
        setDimmer: dispatchers.setDimmer.bind(undefined, dispatch)
    }
}

class TabContent extends React.Component {
    componentDidMount() {
        this.selecFromTable(this.props.tableName);
    }

    componentWillReceiveProps(nextProps) {
        this.selecFromTable(nextProps.tableName)
    }

    selecFromTable(tableName) {
        this.props.setDimmer(true, DimmerType.loader);
        this.props.knex.select().from(tableName)
            .then((rows) => {
                // if (rows.length > 0) {
                this.th = _.map(rows[0], (value, key) => {
                    return key;
                });
                this.td = rows;
                this.forceUpdate();
                // }
            })
            .catch(()=> {
                this.td = [];
                this.forceUpdate();
            }).then(()=> {
            setTimeout(()=> {
                this.props.setDimmer(false);
            }, 500);
        });
    }

    render() {
        const thead = _.map(this.th, (th, index) => {
            return (
                <th key={"head cell" + th + index}>{th}</th>
            )
        });

        const tbody = _.map(this.td, (row, rowIndex) => {
            return (
                <tr key={"body cell " +rowIndex}>
                    {_.map(this.th, (th, thIndex) => {
                        const tdValue = row[th];
                        return (
                            <td key={"body cell: {\n" + "ROW:" + rowIndex + ",\n COLUMN: " + thIndex + "\n}"}>{tdValue}</td>
                        )
                    })}
                </tr>
            )
        });
        return (
            <div className="ui basic segment table-content">
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
}

export default connect(getStatsus, dispatchStatus)(TabContent);
// export default connect(getStatus)(TabContent);


// <div className="ui form sql-command-input">
//     <textarea rows="2"></textarea>
// </div>
// <div className="run-button-container">
//     <button className="ui primary button run-button" onClick={this.runSqlCommand.bind(this)}>Run
// </button>
// </div>