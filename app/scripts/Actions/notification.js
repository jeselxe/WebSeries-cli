
const dismissNotification = (dispatch) => {
    dispatch({
        type: 'DISMISS_NOTIFICATION'
    });
}

const newSuccessNotification = (dispatch, message, duration) => {
    dispatch({
        type: 'NEW_NOTIFICATION',
        message,
        style: 'success'
    });
    setTimeout(function () {
        dismissNotification(dispatch);
    }, duration || 2000)
}

const newErrorNotification = (dispatch, message, duration) => {
    dispatch({
        type: 'NEW_NOTIFICATION',
        message,
        style: 'error'
    });
    setTimeout(function () {
        dismissNotification(dispatch);
    }, duration || 2000)
}

export default {
    newSuccessNotification,
    newErrorNotification,
    dismissNotification
}
