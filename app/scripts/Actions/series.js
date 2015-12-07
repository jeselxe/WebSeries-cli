import config from '../config';


const modal = (dispatch) => {
    dispatch({
        type: 'TOGGLE_MODAL'
    });
}

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

const selectSeason = (dispatch, serie, season) => {
    $.ajax({
        url: config.api.url + '/series/' + serie + '/temporada/' + season,
        dataType: 'json',
        cache: false,
        success: function(data) {
            dispatch({
                type: 'GET_EPISODES',
                episodes: data
            });
            dispatch({
                type: 'SELECT_SEASON',
                season
            });
            if(data.length>0)
                selectEpisode(dispatch, serie, season, data[0].id);
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

const deleteSeason = (dispatch, token, serie, season) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + season,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'DELETE',
            cache: false,
            success: function(data, status, xhr) {
                getSerie(dispatch, serie);
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

const newSeason = (dispatch, token, serie) => {
    if(token) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            type: 'POST',
            cache: false,
            success: function(data, status, xhr) {
                getSerie(dispatch, serie)
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
                selectSeason(dispatch, serie, season);
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
                selectSeason(dispatch, serie, season);
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
                selectSeason(dispatch, serie, season);
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
                selectEpisode(dispatch, serie, season, episode);
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
                selectSerie(dispatch, serie);
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
                selectEpisode(dispatch, serie, season, episode);
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
                selectSerie(dispatch, serie);
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
                selectEpisode(dispatch, serie, season, episode);
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
                selectSerie(dispatch, serie);
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
    getSeries,
    getSerie,
    newSerie,
    selectSeason,
    deleteSeason,
    newSeason,
    selectEpisode,
    deleteEpisode,
    newEpisode,
    updateEpisode,
    newComment,
    updateComment,
    deleteComment,
    newSerieComment,
    updateSerieComment,
    deleteSerieComment

}
