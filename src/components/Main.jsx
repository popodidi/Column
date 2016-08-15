import React from 'react';
import {connect} from 'react-redux'
import {RouteHandler, Link, hashHistory} from 'react-router';

import _ from 'lodash';
import $ from 'jquery';

import '../css/main.css';

function getStatus(state) {
    return {
        db_directory: state.db_directory,
        tables: state.tables,
        knex: state.knex
    }
}

class Main extends React.Component {

    render() {
        return (
            <div className="main">
                <div className="ui visible sidebar inverted vertical menu">
                    <div className="item">
                        <Link to="/main" className="header">Run SQL Command</Link>
                        <div className="menu">
                            {_.map(this.props.tables, (table) => {
                                return (
                                    <Link to={"/main/table/" + table} className="item" key={table}>
                                        {table}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(getStatus)(Main);