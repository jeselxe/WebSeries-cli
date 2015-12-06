import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
    }
}

class NewCapitulo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false
        }
    }
    addMode() {
        this.setState({
            adding: true
        });
    }
    newCapitulo() {
        let capituloName = this.refs.name.value;
        if (capituloName === "") {
            console.log('Vacio');
            return;
        }
        else if(this.props.token) {
            console.log('new capitulo');
            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada/' + this.props.temporada + '/capitulo',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                data: {
                    title: capituloName
                },
                type: 'POST',
                cache: false,
                success: function(data, status, xhr) {

                },
                error: function(xhr, status, err) {
                    console.error(config.api.url, status, err);
                }
            });
        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
    renderAddButton() {
        return (
            <button className="btn btn-primary btn-block margin-top" onClick={ this.addMode.bind(this) } ><span className="glyphicon glyphicon-plus"></span></button>
        );
    }
    renderSubmit() {
        return(
            <div className="input-group input-group-block">
                <input ref="name" className="form-control" />

                <span className="input-group-btn">
                    <a className="btn btn-primary" onClick={ this.newCapitulo.bind(this) }>
                        <span className="glyphicon glyphicon-plus"></span>
                    </a>
                </span>
            </div>
        );
    }
    render () {
        return(
            <div className="">{ this.state.adding ? this.renderSubmit() : this.renderAddButton() }</div>
        );
    }
}

export default connect(mapStateToProps)(NewCapitulo);
