import React, { PropTypes } from 'react';
import Capitulo from './Capitulo';

class CapitulosList extends React.Component {
    constructor(props) {
        super(props);
    }
    select(e) {
        var capituloId = e.target.id.split('_')[1];
        this.props.onSelect(capituloId);
    }
    render () {
        var CapitulosNodes = this.props.data.map(function (capitulo) {
            return (
                <button className="btn btn-default btn-block" id={'capitulo_' + capitulo.id} key={capitulo.id} onClick={this.select.bind(this)}>{capitulo.title}</button>
            );
        }.bind(this));

        return (
            <div className="CapitulosList">
                <h4>Capitulos</h4>
                {CapitulosNodes}
                <Capitulo serie={ this.props.serie } temporada={ this.props.temporada } />
            </div>
        );
    }
}

export default CapitulosList;
