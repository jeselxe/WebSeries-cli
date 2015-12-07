import config from '../config';
import temporadas from './temporadas';
import modal from './modal';

const selectEpisode = (dispatch, serie, season, episode) => {
    $.ajax({
        url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo/' + episode,
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            dispatch({
                type: 'GET_COMMENTS',
                comments: data.comentarios
            });
            dispatch({
                type: 'SELECT_EPISODE',
                episode
            });
        },
        error: function(xhr, status, err) {
            console.error(config.api.url, status, err.toString());
        }
    });
}

const deleteEpisode = (dispatch, token, serie, season, episode) => {
    if(token) {
        console.log('delete capitulo');
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo/' + episode,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'DELETE',
            cache: false,
            success: function(data, status, xhr) {
                temporadas.selectSeason(dispatch, serie, season);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err);
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const newEpisode = (dispatch, token, serie, season, data) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            data,
            type: 'POST',
            cache: false,
            success: function(data, status, xhr) {
                temporadas.selectSeason(dispatch, serie, season);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err);
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const updateEpisode = (dispatch, token, serie, season, episode, data) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo/' + episode,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            data,
            type: 'PUT',
            cache: false,
            success: function(data, status, xhr) {
                temporadas.selectSeason(dispatch, serie, season);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err);
            }
        });
    }
    else {
        modal(dispatch);
    }
}

export default {
    selectEpisode,
    newEpisode,
    updateEpisode,
    deleteEpisode
}
