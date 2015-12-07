import React, { PropTypes } from 'react';
import Grafica from './Grafica';
import ComentariosBox from '../Comentarios/ComentariosBox';

class InfoSerie extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col-md-6"><Grafica title={this.props.title} /></div>
                <div className="col-md-6">
                    <ComentariosBox data={this.props.comentarios} serie={true} />
                </div>
            </div>
        );
    }
}

export default InfoSerie;
