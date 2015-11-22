import React from 'react';
import TemporadasList from './TemporadasList';
import CapitulosBox from '../Capitulos/CapitulosBox';
import config from '../../config';

class TemporadasBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data : []
        };
    }
    loadTemporadaFromServer(temporadaId) {
        $.ajax({
            url: config.api.url + '/series/' + this.props.serie + '/temporada/' + temporadaId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.temporadas) {
            var temporada = nextProps.data.temporadas[0].id;
            this.loadTemporadaFromServer(temporada);
        }
    }
    render() {
        return (
            <div className="temporadas">

                <TemporadasList data={ this.props.data } onSelect={ this.loadTemporadaFromServer.bind(this) } />
                <CapitulosBox serie={ this.props.serie } data={ this.state.data } />
            </div>
        );
    }
}

export default TemporadasBox;
