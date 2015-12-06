import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
    }
}

class Capitulo extends React.Component {
    editCapitulo() {
        let capituloName = this.refs.name.value;
        if (capituloName === "") {
            console.log('Vacio');
            return;
        }
        else if(this.props.token) {
            console.log('edit capitulo');
            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada/' + this.props.temporada + '/capitulo/' + this.props.capitulo,
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                data: {
                    title: capituloName
                },
                type: 'PUT',
                cache: false,
                success: function(data, status, xhr) {

                },
                error: function(xhr, status, err) {
                    console.error(config.api.url, status, err);
                }
            });
            this.props.edit.edit = false;
        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
    renderTitle() {
        return (
            <a onClick={ this.props.clicked }>{ this.props.children }</a>
        );
    }
    renderSubmit() {
        return(
            <div className="input-group">
                <input ref="name" className="form-control" defaultValue={this.props.children} />

                <span className="input-group-btn">
                    <a className="btn btn-primary" onClick={ this.editCapitulo.bind(this) }>
                        Editar
                    </a>
                </span>
            </div>
        );
    }
    render () {
        return(
            <div className="">{ this.props.edit.id === this.props.capitulo && this.props.edit.edit ? this.renderSubmit() : this.renderTitle() }</div>
        );
    }
}

export default connect(mapStateToProps)(Capitulo);
