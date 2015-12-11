import { combineReducers } from 'redux';
import login from './login';
import modal from './modal';
import series from './series';
import notification from './notification';

export default combineReducers({
    login,
    modal,
    series,
    notification
});
