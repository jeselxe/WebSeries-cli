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
    render() {
        return (
            <div className="temporadas">
                <TemporadasList onNewTemporada={ this.newTemporada.bind(this) } />
                <CapitulosBox />
            </div>
        );
    }
}

export default connect(mapStateToProps)(TemporadasBox);
