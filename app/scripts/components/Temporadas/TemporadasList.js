import React from 'react';
import ComentariosBox from '../Comentarios/ComentariosBox';
import Temporada from './Temporada';

class TemporadasList extends React.Component {
    constructor(props) {
        super(props);
    }
    select(e) {
        var temporadaId = e.target.id.split('_')[1]
        this.props.onSelect(temporadaId);
    }
    render() {
        var temporadas = this.props.data.temporadas;
        var TemporadasNodes = [];
        if (temporadas) {
            TemporadasNodes = temporadas.map(function (temporada) {
                return (
                    <Temporada id={ temporada.id } onClick={ this.select.bind(this) } key={ temporada.id }>{temporada.season}</Temporada>
                );
            }.bind(this));
        }
        return (
            <div className="TemporadasList">
                <h4>Temporadas</h4>
                <div className="btn-group btn-group-justified">
                    {TemporadasNodes}
                    <a className="btn btn-default btn-block" onClick={ this.props.onNewTemporada }><span className="glyphicon glyphicon-plus"></span></a>
                </div>
            </div>
        );
    }
}

export default TemporadasList;
