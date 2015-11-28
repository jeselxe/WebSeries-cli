import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import cookie from '../../utils/cookie';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.login.logged
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClicked: () => {
            cookie.unset('token');
            dispatch({
                type: 'LOGOUT'
            })
        },
        onLoginClicked: () => {
            dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
}

class LoginButton extends React.Component {
    render () {
        return(
            <div className="">
                <ul className="nav navbar-nav navbar-right">
                    { this.props.loggedIn ?
                        [<li key="1"><a onClick={ this.props.onLogoutClicked }>Logout</a></li>] :
                        [<li key="2"><a onClick={ this.props.onLoginClicked }>Login</a></li>,
                         <li key="3"><a>Register</a></li>] }
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
