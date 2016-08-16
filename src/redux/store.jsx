import reducer, {initialState} from './reducer.jsx';
import {createStore} from 'redux';

var store = createStore(reducer, initialState);

export default store;
