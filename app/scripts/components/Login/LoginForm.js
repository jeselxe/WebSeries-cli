import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from '../../config';
import cookie from '../../utils/cookie';

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  console.log('Save token');
  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

const mapStateToProps = (state) => {
    return {
        logged: state.login
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (user, password) => {
            let login = {
                user,
                password
            };
            $.ajax({
                url: config.api.url + '/usuario/login',
                dataType: 'json',
                type: 'POST',
                data: login,
                success: function(data) {
                    console.log(data);
                    const token = data.token;
                    saveAuthToken(token);
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        token
                    });
                    dispatch({
                        type: 'TOGGLE_MODAL'
                    })
                }.bind(this),
                error: function(xhr, status, err) {
                    let error = 'Unknown error occured :-(. Please, try again later.';
                    if(xhr.status == 401){
                        error = xhr.responseText;
                    }
                    dispatch({
                        type: 'LOGIN_FAILURE',
                        error
                    });
                }.bind(this)
            });
        }
    }
};

class LoginForm extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { errors : false }
    }
    handleSubmit(e) {
        e.preventDefault();
        var login = {
            user : this.refs.user.value,
            password : this.refs.password.value
        }
        this.props.login(login.user, login.password);

    }
    render () {
        return (
                <div className="">
                    { this.props.logged.error ? <div className="alert alert-danger">{this.props.logged.error}</div> : null }
                    <form action="" className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
                        <div className="form-group">
                            <label className="control-label col-sm-offset-2 col-sm-2">User</label>
                            <div className="col-sm-5">
                                <input type="text" ref="user" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-offset-2 col-sm-2">Password</label>
                            <div className="col-sm-5">
                                <input type="password" ref="password" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-4 col-sm-5"><button className="btn btn-block btn-primary">Login</button></div>
                        </div>
                    </form>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
