import React from 'react';
import {connect} from 'react-redux';
import ComentariosBox from '../Comentarios/ComentariosBox';
import Temporada from './Temporada';
import {temporadasActions} from '../../Actions';

const mapStateToProps = (state) => {
    return {
        data : state.series.serie,
        token : state.login.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newSeason: (token, serie) => {
            temporadasActions.newSeason(dispatch, token, serie);
        }
    }
};

class TemporadasList extends React.Component {
    newTemporada() {
        this.props.newSeason(this.props.token, this.props.data.id)
    }
    render() {
        var temporadas = this.props.data.temporadas;
        var TemporadasNodes = [];
        if (temporadas) {
            TemporadasNodes = temporadas.map(function (temporada) {
                return (
                    <Temporada id={ temporada.id } key={ temporada.id }>{temporada.season}</Temporada>
                );
            }.bind(this));
        }
        return (
            <div className="TemporadasList">
                <h4>Temporadas</h4>
                <div className="btn-group btn-group-justified">
                    {TemporadasNodes}
                    <a className="btn btn-primary btn-block" onClick={ this.newTemporada.bind(this) }><span className="glyphicon glyphicon-plus"></span></a>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemporadasList);
