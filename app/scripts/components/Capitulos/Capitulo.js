import React, { PropTypes } from 'react';

class Capitulo extends React.Component {
    editCapitulo() {
        let capituloName = this.refs.name.value;
        if (capituloName === "") {
            console.log('Vacio');
            return;
        }
        this.props.onEdit({ title: capituloName });
        this.props.edit.edit = false;
    }
    selected() {
        this.props.onSelect();
    }
    renderTitle() {
        return (
            <a onClick={ this.selected.bind(this) }>{ this.props.children }</a>
        );
    }
    renderSubmit() {
        return(
            <div className="input-group">
                <input ref="name" className="form-control" defaultValue={this.props.children} />

                <span className="input-group-btn">
                    <a className="btn btn-primary" onClick={ this.editCapitulo.bind(this) }>
                        Editar
                    </a>
                </span>
            </div>
        );
    }
    render () {
        return(
            <div className="">{ this.props.edit.id === this.props.capitulo && this.props.edit.edit ? this.renderSubmit() : this.renderTitle() }</div>
        );
    }
}

export default Capitulo;
