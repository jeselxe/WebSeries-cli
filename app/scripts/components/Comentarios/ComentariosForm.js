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
            <div className="commentForm">
                <form className="" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="input-group">
                        <textarea className="form-control" rows="3" ref="text" placeholder="Comenta algo..." defaultValue={this.props.children || ''}></textarea>
                        <span className="input-group-addon"><button type="submit" className="btn btn-primary">Enviar</button></span>
                    </div>
                </form>
                <div className="comment-info">Compatible con markdown</div>
            </div>
        );
    }
}

export default ComentariosForm;
