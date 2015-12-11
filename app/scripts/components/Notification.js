import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {notificationActions} from '../Actions';

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
};



@connect(mapStateToProps)
class Notification extends React.Component {
    dismiss() {
        notificationActions.dismissNotification(this.props.dispatch);
    }
    render () {
        let style = "notification " + this.props.notification.style;

        if (this.props.notification.active) style += " active";
        return (
            <div className={style} onClick={this.dismiss.bind(this)}>
                {this.props.notification.message}
            </div>
        )
    }
}

export default Notification;
