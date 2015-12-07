import React, { PropTypes } from 'react';
import NewCapitulo from './NewCapitulo';
import Capitulo from './Capitulo';
import ActionButton from '../ActionButton';
import {connect} from 'react-redux';
import serieActions from '../../Actions/series';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        data: state.series.capitulos,
        serie: state.series.serie,
        temporada: state.series.temporada

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectEpisode : (serie, temporada, capitulo) => {
            serieActions.selectEpisode(dispatch, serie, temporada, capitulo);
        },
        deleteEpisode: (token, serie, season, episode) => {
            serieActions.deleteEpisode(dispatch, token, serie, season, episode);
        },
        newEpisode: (token, serie, season, data) => {
            serieActions.newEpisode(dispatch, token, serie, season, data);
        },
        updateEpisode: (token, serie, season, episode, data) => {
            serieActions.updateEpisode(dispatch, token, serie, season, episode, data);
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
            return (
                <div className="list-group-item actions-list" key={capitulo.id}>
                    <Capitulo edit={this.state.editar} capitulo={capitulo.id} onEdit={ this.onEdit.bind(this, capitulo) } onSelect={ this.onSelect.bind(this, capitulo) }>{capitulo.title}</Capitulo>
                    <div className="actions">
                        <ActionButton>
                            <ActionButton.Item onClick={ this.borrar.bind(this, capitulo) }>Borrar</ActionButton.Item>
                            <ActionButton.Item onClick={ this.editar.bind(this, capitulo) }>Editar</ActionButton.Item>
                        </ActionButton>
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="CapitulosList list-group">
                <h4>Capitulos</h4>
                {CapitulosNodes}
                <NewCapitulo onNewCapitulo={ this.nuevo.bind(this) } />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapitulosList);
