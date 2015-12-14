import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from '../../config';
import {loginActions} from '../../Actions';

const mapDispatchToProps = (dispatch) => {
    return {
        register: (login) => {
            loginActions.register(dispatch, login);
        }
    }
};

@connect(null, mapDispatchToProps)
class Register extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { errors : false, error: '' }
    }
    register(nickname, password) {
        let login = {
            nickname,
            password
        };
        this.props.register(login);
    }
    handleSubmit(e) {
        e.preventDefault();
        var login = {
            user : this.refs.user.value,
            password : this.refs.password.value,
            confirm : this.refs.confirm.value
        }
        if(!login.user || !login.password) {
            this.setState({
                errors: true,
                error: 'Usuario y password obligatorios'
            });
            return;
        }
        else if (login.password !== login.confirm) {
            this.setState({
                errors: true,
                error: 'Las contraseñas no coinciden'
            });
            return;
        }
        else {
            this.setState({
                errors: false
            });
            this.register(login.user, login.password);
        }
    }
    render () {
        return (
                <div className="">
                    { this.state.errors ? <div className="alert alert-danger">{this.state.error}</div> : null }
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
                            <label className="control-label col-sm-offset-2 col-sm-2">Confirm Password</label>
                            <div className="col-sm-5">
                                <input type="password" ref="confirm" className="form-control" />
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

export default Register;
