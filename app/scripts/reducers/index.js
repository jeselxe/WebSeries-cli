import { combineReducers } from 'redux';
import login from './login';
import modal from './modal';
import series from './series';

export default combineReducers({
    login,
    modal,
    series
});
