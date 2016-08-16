const initialState = {
    // db_directory: "Choose your SQLite database ...",
    // tables: [],
    //
    active_tab: 0,
    tabs: [
        {
            db_directory: "Choose your SQLite database ...",
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
        db_directory: "Choose your SQLite database ...",
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
        // case 'SET_DB_DIRECTORY':
        //     return setDbDirectory(state, action);
        // case 'SET_TABLES':
        //     return setTables(state, action);
        // case 'SET_KNEX':
        //     return setKnex(state, action);
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

// function setDbDirectory(state, action) {
//     return Object.assign({}, state, {db_directory: action.db_directory});
// }
//
// function setTables(state, action) {
//     return Object.assign({}, state, {tables: action.tables});
// }
//
// function setKnex(state, action) {
//     return Object.assign({}, state, {knex: action.knex});
// }

function setSqlResult(state, action) {

    var newTabs = state.tabs;
    console.log("IN",action.tabIndex);
    console.log("RE",newTabs[action.tabIndex]);
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
