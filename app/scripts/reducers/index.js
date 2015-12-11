import { combineReducers } from 'redux';
import {routeReducer} from 'redux-simple-router';
import login from './login';
import modal from './modal';
import series from './series';
import notification from './notification';

export default combineReducers({
    routing: routeReducer,
    login,
    modal,
    series,
    notification
});
