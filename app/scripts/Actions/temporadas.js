import config from '../config';
import capitulos from './capitulos';
import series from './series';
import modal from './modal';

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
                capitulos.selectEpisode(dispatch, serie, season, data[0].id);
        },
        error: function(xhr, status, err) {
            console.error(config.api.url, status, err.toString());
        }
    });
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
                series.getSerie(dispatch, serie)
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
                series.getSerie(dispatch, serie);
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
    newSeason,
    deleteSeason,
    selectSeason
}
