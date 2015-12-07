import React from 'react';
import {connect} from 'react-redux';
import CapitulosList from './CapitulosList';
import ComentariosBox from '../Comentarios/ComentariosBox';

const mapStateToProps = (state) => {
    return {
        data: state.series.comentarios
    }
};

class CapitulosBox extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <CapitulosList />
                </div>
                <div className="col-md-8">
                    <ComentariosBox data={ this.props.data } toSerie={false} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CapitulosBox);
