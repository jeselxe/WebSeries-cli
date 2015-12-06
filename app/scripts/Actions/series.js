import config from '../config';


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
            selectEpisode(dispatch, serie, season, data[0].id);
        },
        error: function(xhr, status, err) {
            console.error(config.api.url, status, err.toString());
        }
    });
}


export default {
    selectSeason,
    selectEpisode
}
