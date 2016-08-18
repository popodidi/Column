import _ from 'lodash';

const default_db_directory = process.env.NODE_ENV == "development" ? "/Users/changhao/Desktop/apm.db": undefined;

const initialState = {
    // db_directory: "Choose your SQLite database ...",
    // tables: [],
    //
    active_tab: 0,
    tabs: [
        {
            // db_directory: "Choose your SQLite database ...",
            db_directory:default_db_directory,
            db_name: "Choose Database",
            knex: undefined,
            selected_table: "sqlite_master",
            tables: ["sqlite_master"],
            sql_runner: {
                command: "",
                result: []
            }
        }
    ],
    default_tab: {
        db_directory: default_db_directory,
        db_name: "Choose Database",
        knex: undefined,
        selected_table: "sqlite_master",
        tables: ["sqlite_master"],
        sql_runner: {
            sql_command: "",
            result: []
        }
    },
    sql_runner: "SQL Runner Tab Content"
};

function reducer(state, action) {
    if (typeof state === 'undefined') {
        state = initialState;
    }

    switch (action.type) {
        case 'ADD_TAB':
            return addTab(state, action);
        case 'SET_ACTIVE_TAB':
            return setActiveTab(state, action);
        case 'UPDATE_TAB':
            return updateTab(state, action);
        case 'DELETE_TAB':
            return deleteTab(state, action);
        case 'SET_SQL_COMMAND':
            return setSqlCommand(state, action);
        case 'SET_SQL_RESULT':
            return setSqlResult(state, action);
    }

    return state;
}

// Actions
function addTab(state, action) {
    return Object.assign({}, state, {tabs: state.tabs.concat([state.default_tab])});
}

function setActiveTab(state, action) {
    return Object.assign({}, state, {active_tab: action.active_tab});
}

function updateTab(state, action) {
    var newTabs = state.tabs;
    newTabs[action.index] = action.tab;
    return Object.assign({}, state,{tabs: newTabs});
}

function deleteTab(state, action) {
    var newTabs = state.tabs;
    newTabs.splice(action.index, 1);
    var newActiveTab = state.active_tab;
    if (state.active_tab >= state.tabs.length) {
        newActiveTab -= 1;
    }
    return Object.assign({}, state, {
        active_tab: newActiveTab,
        tabs: newTabs
    });
}

function setSqlResult(state, action) {
    var newTabs = state.tabs;
    newTabs[action.tabIndex].sql_runner.result = action.sql_result;
    return Object.assign({}, state,{tabs: newTabs});
}

function setSqlCommand(state, action) {
    var newTabs = state.tabs;
    newTabs[action.tabIndex].sql_runner.command = action.sql_command;
    return Object.assign({}, state,{tabs: newTabs});
}


export default reducer;
export {initialState};
