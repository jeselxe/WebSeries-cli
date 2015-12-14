import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {loginActions, modal} from '../../Actions';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.login.logged
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClicked: () => {
            loginActions.logout(dispatch);
        },
        onLoginClicked: () => {
            modal(dispatch);
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
                         <li key="3"><a href="#/register">Register</a></li>] }
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
