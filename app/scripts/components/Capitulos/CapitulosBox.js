import React from 'react';
import CapitulosList from './CapitulosList';
import ComentariosBox from '../Comentarios/ComentariosBox';

class CapitulosBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onCapituloSelected(capituloId) {
        this.setState({ capitulo: capituloId });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length > 0) {
            this.setState({
                capitulo: nextProps.data[0].id,
                temporada: nextProps.data[0].TemporadaId
            });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <CapitulosList serie={ this.props.serie } temporada={ this.state.temporada } data={this.props.data} onSelect={ this.onCapituloSelected.bind(this) } />
                </div>
                <div className="col-md-8">
                    <ComentariosBox serie={ this.props.serie }
                                    temporada={ this.state.temporada }
                                    capitulo={ this.state.capitulo } />
                </div>
            </div>
        );
    }
}

export default CapitulosBox;
