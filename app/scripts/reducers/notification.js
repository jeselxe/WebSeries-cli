const initialState = {
    active: false,
    message: null,
    style: ''
}

export default function notification(state=initialState, action) {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return {
                active : true,
                message: action.message,
                style : action.style || state.style
            };
        case 'DISMISS_NOTIFICATION':
            return {
                ...initialState,

            }
        default:
            return state;
    }
};
