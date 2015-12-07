import React, { PropTypes } from 'react';
import config from '../../config';

class NewCapitulo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false
        }
    }
    addMode() {
        this.setState({
            adding: true
        });
    }
    newCapitulo() {
        let capituloName = this.refs.name.value;
        if (capituloName === "") {
            console.log('Vacio');
            return;
        }
        this.props.onNewCapitulo({ title: capituloName });
        this.setState({
            adding: false 
        });
    }
    renderAddButton() {
        return (
            <button className="btn btn-primary btn-block margin-top" onClick={ this.addMode.bind(this) } ><span className="glyphicon glyphicon-plus"></span></button>
        );
    }
    renderSubmit() {
        return(
            <div className="input-group input-group-block">
                <input ref="name" className="form-control" />

                <span className="input-group-btn">
                    <a className="btn btn-primary" onClick={ this.newCapitulo.bind(this) }>
                        <span className="glyphicon glyphicon-plus"></span>
                    </a>
                </span>
            </div>
        );
    }
    render () {
        return(
            <div className="">{ this.state.adding ? this.renderSubmit() : this.renderAddButton() }</div>
        );
    }
}

export default NewCapitulo;
