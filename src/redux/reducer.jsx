const initialState = {
    db_directory: "Choose your SQLite database ...",
    // db_directory: "/Users/changhao/Desktop/Slackbot/database.sqlite",
    tables: [],

    sql_runner:{
        sql_command: "",
        result: []
    }
};

function reducer(state, action) {
    if (typeof state === 'undefined') {
        state = initialState;
    }

    switch (action.type) {
        case 'SET_DB_DIRECTORY':
            return setDbDirectory(state, action);
        case 'SET_TABLES':
            return setTables(state, action);
        case 'SET_KNEX':
            return setKnex(state, action);
        case 'SET_SQL_COMMAND':
            return setSqlCommand(state, action);
        case 'SET_SQL_RESULT':
            return setSqlResult(state, action);
    }

    return state;
}

// Actions
function setDbDirectory(state, action){
    return Object.assign({}, state, { db_directory: action.db_directory });
}

function setTables(state, action){
    return Object.assign({}, state, { tables: action.tables });
}

function setKnex(state, action){
    return Object.assign({}, state, { knex: action.knex });
}

function setSqlResult(state, action){
    return Object.assign({}, state,
        {sql_runner: Object.assign({}, state.sql_runner,
            {
                result: action.result
            }
        )}
    )
}

function setSqlCommand(state, action){
    return Object.assign({}, state,
        {sql_runner: Object.assign({}, state.sql_runner,
            {
                sql_command: action.sql_command
            }
        )}
    )
}


export default reducer;
export {initialState};
