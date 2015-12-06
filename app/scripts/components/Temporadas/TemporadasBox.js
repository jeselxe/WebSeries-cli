import React from 'react';
import {connect} from 'react-redux';
import TemporadasList from './TemporadasList';
import CapitulosBox from '../Capitulos/CapitulosBox';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
    }
}

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
    newTemporada() {

        if(this.props.token) {

            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                type: 'POST',
                cache: false,
                success: function(data, status, xhr) {

                },
                error: function(xhr, status, err) {
                    console.error(config.api.url, status, err);
                }
            });


        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
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
                <TemporadasList serie={ this.props.serie } data={ this.props.data } onSelect={ this.loadTemporadaFromServer.bind(this) } onNewTemporada={ this.newTemporada.bind(this) } />
                <CapitulosBox serie={ this.props.serie } data={ this.state.data } />
            </div>
        );
    }
}

export default connect(mapStateToProps)(TemporadasBox);
