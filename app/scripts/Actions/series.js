import {pushPath} from 'redux-simple-router';
import config from '../config';
import temporadas from './temporadas';
import modal from './modal';
import notification from './notification';

const getSeries = (dispatch) => {
    $.ajax({
        url: config.api.url + '/series',
        dataType: 'json',
        cache: false,
        success: function(data) {
            dispatch({
                type: 'GET_SERIES',
                series: data.series
            });
        },
        error: function(xhr, status, err) {
            console.error(config.api.url, status, err.toString());
        }
    });
}

const getSerie = (dispatch, id) => {
    $.ajax({
        url: config.api.url + '/series/' + id,
        dataType: 'json',
        cache: false,
        success: function(data) {
            dispatch({
                type: 'SELECT_SERIE',
                serie: data.serie
            });

            if(data.serie.temporadas.length>0) {
                temporadas.selectSeason(dispatch, id, data.serie.temporadas[0].id);
            }
        },
        error: function(xhr, status, err) {
            console.error(config.api.url, status, err.toString());
        }
    });
}

const selectSerie = (dispatch, id) => {
    $.ajax({
        url: config.api.url + '/series/' + id,
        dataType: 'json',
        cache: false,
        success: function(data) {
            dispatch({
                type: 'SELECT_SERIE',
                serie: data.serie
            });
        },
        error: function(xhr, status, err) {
            console.error(config.api.url, status, err.toString());
        }
    });
}

const newSerie = (dispatch, token, serie) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series',
            type: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            data: serie,
            success: function(data) {
                getSeries(dispatch);
                notification.newSuccessNotification(dispatch, 'La serie ' + serie.title + ' se ha creado correctamente');
                dispatch(pushPath('/series'));
            },
            error: function(xhr, status, err) {
                console.error(xhr, status, err);
                notification.newErrorNotification(dispatch, 'Ha habido un error al crear la serie');
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const deleteSerie = (dispatch, token, id) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + id,
            type: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            dataType: 'json',
            cache: false,
            success: function(data) {
                getSeries(dispatch);
                notification.newSuccessNotification(dispatch, 'La serie se ha eliminado correctamente');
                dispatch(pushPath('/series'));
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
                notification.newErrorNotification(dispatch, 'Ha habido un error al eliminar la serie');
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const updateSerie = (dispatch, token, id, serie) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + id,
            type: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            data: serie,
            success: function(data) {
                getSerie(dispatch, id);
                notification.newSuccessNotification(dispatch, 'La serie ' + serie.title + ' se ha actualizado correctamente');
            },
            error: function(xhr, status, err) {
                console.error(xhr, status, err);
                notification.newErrorNotification(dispatch, 'Ha habido un error al actualizar la serie');
            }
        });
    }
    else {
        modal(dispatch);
    }
}

export default {
    getSeries,
    getSerie,
    newSerie,
    selectSerie,
    deleteSerie,
    updateSerie
}
