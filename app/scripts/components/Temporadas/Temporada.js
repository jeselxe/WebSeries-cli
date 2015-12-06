import React, { PropTypes } from 'react';
import ActionButton from '../ActionButton';
import {connect} from 'react-redux';
import config from '../../config';
import serieActions from '../../Actions/series';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        serie: state.series.serie
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectSeason: (serie, id) => {
            serieActions.selectSeason(dispatch, serie, id);
        }
    }
}

class Temporada extends React.Component {
    borrar() {
        if(this.props.token) {
            console.log('delete temporada');
            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada/' + this.props.id,
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                type: 'DELETE',
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
    click(){
        this.props.selectSeason(this.props.serie.id, this.props.id);
    }
    render () {
        return (
            <div className="btn-group actions-list">
                <button className="btn btn-default" id={'temporada_' + this.props.id} onClick={this.click.bind(this)}>
                    {this.props.children}
                </button>
                <div className="actions">
                    <ActionButton>
                        <ActionButton.Item onClick={ this.borrar.bind(this) }>Borrar</ActionButton.Item>
                    </ActionButton>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Temporada);
