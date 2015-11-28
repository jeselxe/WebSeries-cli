

const initialState = {
  error: null, // last occured error
  token: null,
  profile: null,
  logged: false
};

export default function login(state=initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('LOGIN_SUCCESS!!');
            return {
                ...state,
                error: null,
                token: action.token,
                logged: true
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.error
            };
        case 'INITIAL_LOGIN':
            return {
                ...state,
                token: action.token,
                logged: action.logged
            };
        case 'LOGOUT':
            console.log('LOGOUT');
            return { ...initialState };
        default:
            return state;
    }
};
