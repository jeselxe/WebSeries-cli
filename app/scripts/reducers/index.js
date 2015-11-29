import { combineReducers } from 'redux';
import login from './login';
import modal from './modal';

export default combineReducers({
    login,
    modal
});
