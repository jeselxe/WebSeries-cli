import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {seriesActions} from '../../Actions';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newSerie: (token, serie) => {
            seriesActions.newSerie(dispatch, token, serie);
        }
    }
};

class SerieForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        let serie = {
            title: this.refs.title.value,
            description: this.refs.description.value
        }
        if (serie.title === '' || serie.description === '') {
            return;
        }
        else {
            this.props.newSerie(this.props.token, serie);
        }
    }
    render () {
        return (
            <div>
                <form action="" className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) } >
                    <legend>Nueva serie</legend>
                    <div className="form-group">
                        <label htmlFor="" className="control-label col-md-2">Título</label>
                        <div className="col-md-10"><input type="text" ref="title" className="form-control" /></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="control-label col-md-2">Descripción</label>
                        <div className="col-md-10"><textarea ref="description" className="form-control" rows="3" /></div>
                    </div>
                    <div className="form-group"><div className="col-md-offset-10 col-md-2">
                        <input type="submit" className="btn btn-primary btn-block" value="Añadir Serie" />
                    </div></div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieForm);
