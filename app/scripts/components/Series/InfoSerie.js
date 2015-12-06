import React, { PropTypes } from 'react';
import Grafica from './Grafica';

class InfoSerie extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col-md-6"><Grafica title={this.props.title} /></div>
                <div className="col-md-6">
                    Comentarios
                </div>
            </div>
        );
    }
}

export default InfoSerie;
