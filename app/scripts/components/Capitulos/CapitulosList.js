import React, { PropTypes } from 'react';
import NewCapitulo from './NewCapitulo';
import Capitulo from './Capitulo';
import ActionButton from '../ActionButton';

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
    select(capitulo) {
        this.props.onSelect(capitulo.id);
    }
    borrar() {

    }
    editar(capitulo) {
        this.setState({
            editar: {
                id: capitulo.id,
                edit: true
            }
        });
    }
    render () {
        var CapitulosNodes = this.props.data.map(function (capitulo) {
            return (
                <div className="list-group-item actions-list" key={capitulo.id}>
                    <Capitulo clicked={ this.select.bind(this, capitulo) } edit={this.state.editar} serie={ this.props.serie } temporada={ this.props.temporada } capitulo={capitulo.id}>{capitulo.title}</Capitulo>
                    <div className="actions">
                        <ActionButton>
                            <ActionButton.Item onClick={ this.borrar.bind(capitulo) }>Borrar</ActionButton.Item>
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
                <NewCapitulo serie={ this.props.serie } temporada={ this.props.temporada } />
            </div>
        );
    }
}

export default CapitulosList;
