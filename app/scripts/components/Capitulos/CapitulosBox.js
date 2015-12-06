import React from 'react';
import {connect} from 'react-redux';
import CapitulosList from './CapitulosList';
import ComentariosBox from '../Comentarios/ComentariosBox';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        data: state.series.capitulos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCapitulo: (episode) => {
            dispatch({
                type: 'SELECT_EPISODE',
                episode
            });
        }
    }
}

class CapitulosBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    onCapituloSelected(capituloId) {
        this.setState({ capitulo: capituloId });
    }
    getCapitulos(serie, temporada) {
        $.ajax({
            url: config.api.url + '/series/' + serie + '/temporada/' + temporada,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    data
                });
                this.props.selectCapitulo(data[0]);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(config.api.url, status, err.toString());
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data.temporada && !this.props.data.temporada){
            this.getCapitulos(nextProps.data.serie.id, nextProps.data.temporada);
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CapitulosBox);
