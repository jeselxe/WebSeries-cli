import React from 'react';
import CapitulosList from './CapitulosList';
import ComentariosBox from '../Comentarios/ComentariosBox';

class CapitulosBox extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <CapitulosList />
                </div>
                <div className="col-md-8">
                    <ComentariosBox  />
                </div>
            </div>
        );
    }
}

export default CapitulosBox;
