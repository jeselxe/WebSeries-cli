const initialState = {
  series: [],
  capitulos: [],
  comentarios: [],
  serie: {},
  temporada: null,
};

export default function series(state=initialState, action) {
    switch (action.type) {
        case 'GET_SERIES':
            return {
                ...state,
                series: action.series
            };
        case 'GET_EPISODES':
            return {
                ...state,
                capitulos: action.episodes
            }
        case 'GET_COMMENTS':
            return {
                ...state,
                comentarios: action.comments
            }
        case 'SELECT_SERIE':
            return {
                ...state,
                serie: action.serie
            };
        case 'SELECT_SEASON':
            return {
                ...state,
                temporada: action.season || state.serie.temporadas[0]
            };
        default:
            return state;
    }
};
