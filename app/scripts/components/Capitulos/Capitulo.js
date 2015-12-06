import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import config from '../../config';
import serieActions from '../../Actions/series';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        data : state.series
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectEpisode : (serie, temporada, capitulo) => {
            serieActions.selectEpisode(dispatch, serie, temporada, capitulo);
        }
    }
};

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
    selected() {
        this.props.selectEpisode(this.props.data.serie.id, this.props.data.temporada, this.props.capitulo);
    }
    renderTitle() {
        return (
            <a onClick={ this.selected.bind(this) }>{ this.props.children }</a>
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

export default connect(mapStateToProps,mapDispatchToProps)(Capitulo);
