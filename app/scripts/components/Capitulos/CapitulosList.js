import React, { PropTypes } from 'react';
import NewCapitulo from './NewCapitulo';
import Capitulo from './Capitulo';
import ActionButton from '../ActionButton';
import {connect} from 'react-redux';
import {capitulosActions} from '../../Actions';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        data: state.series.capitulos,
        serie: state.series.serie,
        temporada: state.series.temporada,
        capitulo: state.series.capitulo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectEpisode : (serie, temporada, capitulo) => {
            capitulosActions.selectEpisode(dispatch, serie, temporada, capitulo);
        },
        deleteEpisode: (token, serie, season, episode) => {
            capitulosActions.deleteEpisode(dispatch, token, serie, season, episode);
        },
        newEpisode: (token, serie, season, data) => {
            capitulosActions.newEpisode(dispatch, token, serie, season, data);
        },
        updateEpisode: (token, serie, season, episode, data) => {
            capitulosActions.updateEpisode(dispatch, token, serie, season, episode, data);
        }
    }
};

class CapitulosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editar: {
                id: 0,
                edit: false
            }
        }
    }
    borrar(capitulo) {
        this.props.deleteEpisode(this.props.token, this.props.serie.id, this.props.temporada, capitulo.id);
    }
    nuevo(data) {
        this.props.newEpisode(this.props.token, this.props.serie.id, this.props.temporada, data);
    }
    editar(capitulo) {
        this.setState({
            editar: {
                id: capitulo.id,
                edit: true
            }
        });
    }
    onEdit(capitulo, data) {
        this.props.updateEpisode(this.props.token, this.props.serie.id, this.props.temporada, capitulo.id, data);
    }
    onSelect(capitulo) {
        this.props.selectEpisode(this.props.serie.id, this.props.temporada, capitulo.id);
    }
    render () {
        var CapitulosNodes = this.props.data.map(function (capitulo) {
            let style = "list-group-item actions-list";
            if (this.props.capitulo === capitulo.id) style += " active";
            return (
                <li className={style} key={capitulo.id}>
                    <Capitulo edit={this.state.editar} capitulo={capitulo.id} onEdit={ this.onEdit.bind(this, capitulo) } onSelect={ this.onSelect.bind(this, capitulo) }>{capitulo.title}</Capitulo>
                    <div className="actions">
                        <ActionButton>
                            <ActionButton.Item onClick={ this.borrar.bind(this, capitulo) }>Borrar</ActionButton.Item>
                            <ActionButton.Item onClick={ this.editar.bind(this, capitulo) }>Editar</ActionButton.Item>
                        </ActionButton>
                    </div>
                </li>
            );
        }.bind(this));

        return (
            <div className="CapitulosList">
                <h4>Capitulos</h4>
                <ul className="list-group">
                    {CapitulosNodes}
                    <NewCapitulo onNewCapitulo={ this.nuevo.bind(this) } />
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapitulosList);
