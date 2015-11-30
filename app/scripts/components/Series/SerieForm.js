import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
    }
}

class SerieForm extends React.Component {

    newSerie(serie) {
        if(this.props.token) {
            $.ajax({
                url: config.api.url + '/series',
                type: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                data: serie,
                success: function(data) {
                    console.log('Serie creada');
                },
                error: function(xhr, status, err) {
                    console.error(xhr, status, err);
                }
            });
        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
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
            this.newSerie(serie);
        }
    }
    render () {
        return (
            <div>
                <form action="" className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) } >
                    <div className="form-group">
                        <label htmlFor="" className="control-label col-md-2">Título</label>
                        <div className="col-md-10"><input type="text" ref="title" className="form-control" /></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="control-label col-md-2">Descripción</label>
                        <div className="col-md-10"><textarea ref="description" className="form-control" rows="3" /></div>
                    </div>
                    <div className="form-group"><div className="col-md-offset-10 col-md-2">
                        <input type="submit" className="btn btn-primary btn-block" />
                    </div></div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SerieForm);
