import React from 'react';
import {connect} from 'react-redux';
import ComentariosBox from '../Comentarios/ComentariosBox';
import Temporada from './Temporada';

const mapStateToProps = (state) => {
    return {
        data : state.series.serie,
        serie : state.series.serie
    }
}

class TemporadasList extends React.Component {
    constructor(props) {
        super(props);
    }
    select(temporada) {
        this.props.onSelect(temporada.id);
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
                    <a className="btn btn-primary btn-block" onClick={ this.props.onNewTemporada }><span className="glyphicon glyphicon-plus"></span></a>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TemporadasList);
