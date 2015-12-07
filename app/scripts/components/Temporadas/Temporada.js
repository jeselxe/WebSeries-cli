import React, { PropTypes } from 'react';
import ActionButton from '../ActionButton';
import {connect} from 'react-redux';
import config from '../../config';
import {temporadasActions} from '../../Actions';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        serie: state.series.serie
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectSeason: (serie, season) => {
            temporadasActions.selectSeason(dispatch, serie, season);
        },
        deleteSeason: (token, serie, season) => {
            temporadasActions.deleteSeason(dispatch, token, serie, season);
        }
    }
}

class Temporada extends React.Component {
    borrar() {
        this.props.deleteSeason(this.props.token, this.props.serie.id, this.props.id);
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
