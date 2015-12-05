import React, { PropTypes } from 'react';
import Capitulo from './Capitulo';
import ActionButton from '../ActionButton';

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
                <div className="list-group-item actions-list" key={capitulo.id}>
                    <a id={'capitulo_' + capitulo.id}  onClick={this.select.bind(this)}>
                        {capitulo.title}
                    </a>
                    <div className="actions">
                        <ActionButton>
                            <ActionButton.Item>Editar</ActionButton.Item>
                            <ActionButton.Item>Borrar</ActionButton.Item>
                        </ActionButton>
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="CapitulosList list-group">
                <h4>Capitulos</h4>
                {CapitulosNodes}
                <Capitulo serie={ this.props.serie } temporada={ this.props.temporada } />
            </div>
        );
    }
}

export default CapitulosList;
