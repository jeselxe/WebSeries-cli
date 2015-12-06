const initialState = {
  series: [],
  serie: {},
  temporada: {},
  capitulo: {}
};

export default function series(state=initialState, action) {
    switch (action.type) {
        case 'GET_SERIES':
            return {
                ...state,
                series: action.series
            };
        case 'SELECT_SERIE':
            return {
                ...state,
                serie: action.serie
            };
        case 'SELECT_SEASON':
            return {
                ...state,
                temporada: action.season
            };
        case 'SELECT_EPISODE':
            return {
                ...state,
                capitulo: action.episode
             };
        default:
            return state;
    }
};
