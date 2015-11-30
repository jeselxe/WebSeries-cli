import React, { PropTypes } from 'react';

class ComentariosForm extends React.Component {
    handleSubmit (e) {
        e.preventDefault();
        var text = this.refs.text.value;
        if (!text) {
            return;
        }
        this.props.onCommentSubmit({comment: text});
        this.refs.text.value = '';
    }
    render () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-group">
                    <textarea className="form-control" rows="3" ref="text" placeholder="Comenta algo..."></textarea>
                    <span className="input-group-addon"><button type="submit" className="btn btn-primary">Enviar</button></span>
                </div>
            </form>
        );
    }
}

export default ComentariosForm;
