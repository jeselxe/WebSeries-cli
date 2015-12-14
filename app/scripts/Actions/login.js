import {pushPath} from 'redux-simple-router';
import config from '../config';
import modal from './modal';
import cookie from '../utils/cookie';
import notification from './notification';

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

const login = (dispatch, login, toggleModal = true) => {
    $.ajax({
        url: config.api.url + '/usuario/login',
        dataType: 'json',
        type: 'POST',
        data: login,
        success: function(data) {
            let token = data.token;
            saveAuthToken(token);
            dispatch({
                type: 'LOGIN_SUCCESS',
                token
            });
            if (toggleModal) modal(dispatch);
        },
        error: function(xhr, status, err) {
            let error = 'Unknown error occured :-(. Please, try again later.';
            if(xhr.status == 401){
                error = xhr.responseText;
            }
            dispatch({
                type: 'LOGIN_FAILURE',
                error
            });
        }
    });
}

const logout = (dispatch) => {
    cookie.unset('token');
    dispatch({
        type: 'LOGOUT'
    })
}

const register = (dispatch, data) => {
    $.ajax({
        url: config.api.url + '/usuario',
        type: 'POST',
        data,
        success: function() {
            notification.newSuccessNotification(dispatch, '¡Te has registrado correctamente!');
            login(dispatch, {
                user: data.nickname,
                password: data.password
            }, false);
            dispatch(pushPath('/series'));
        },
        error: function(xhr, status, err) {
            console.log(xhr, status, err);
        }
    });
}

export default {
    login,
    logout,
    register
}
