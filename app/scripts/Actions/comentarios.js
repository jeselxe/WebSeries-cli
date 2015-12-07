import config from '../config';
import capitulos from './capitulos';
import series from './series';
import modal from './modal';

const newComment = (dispatch, token, serie, season, episode, data) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo/' + episode + '/comentario',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'POST',
            data,
            success: function(data) {
                capitulos.selectEpisode(dispatch, serie, season, episode);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const newSerieComment = (dispatch, token, serie, data) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/comentario',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'POST',
            data,
            success: function(data) {
                series.selectSerie(dispatch, serie);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const updateComment = (dispatch, token, serie, season, episode, comment, data) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo/' + episode + '/comentario/' + comment,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'PUT',
            data,
            success: function(data) {
                capitulos.selectEpisode(dispatch, serie, season, episode);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const updateSerieComment = (dispatch, token, serie, comment, data) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/comentario/' + comment,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'PUT',
            data,
            success: function(data) {
                series.selectSerie(dispatch, serie);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const deleteComment = (dispatch, token, serie, season, episode, comment) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season + '/capitulo/' + episode + '/comentario/' + comment,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'DELETE',
            success: function(data) {
                capitulos.selectEpisode(dispatch, serie, season, episode);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    else {
        modal(dispatch);
    }
}

const deleteSerieComment = (dispatch, token, serie, comment) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/comentario/' + comment,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'DELETE',
            success: function(data) {
                series.selectSerie(dispatch, serie);
            },
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    else {
        modal(dispatch);
    }
}

export default {
    newComment,
    updateComment,
    deleteComment,
    newSerieComment,
    updateSerieComment,
    deleteSerieComment

}
