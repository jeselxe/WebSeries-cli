import React, { PropTypes } from 'react';
import ActionButton from '../ActionButton';
import {connect} from 'react-redux';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
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
    render () {
        return (
            <div className="btn-group actions-list">
                <button className="btn btn-default" id={'temporada_' + this.props.id} onClick={this.props.onClick}>
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

export default connect(mapStateToProps)(Temporada);
