import config from '../config';
import {selectSeason} from './temporadas';
import modal from './modal';

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
                selectSeason(dispatch, id, data.serie.temporadas[0].id);
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
                console.log('Serie creada');
            },
            error: function(xhr, status, err) {
                console.error(xhr, status, err);
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
    newSerie

}
