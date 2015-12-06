import React, { PropTypes } from 'react';
import ActionButton from '../ActionButton';
import ComentariosForm from './ComentariosForm';
import marked from 'marked';
import moment from 'moment';

class Comentario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edditing: false
        }
    }
    rawMarkup () {
        var markup = marked(this.props.children.toString(), {sanitize: true});
        return { __html : markup};
    }
    editMode() {
        this.setState({
            edditing: true
        });
    }
    handleCommentEdited(comment) {
        comment.id = this.props.id;
        this.props.onCommentEdited(comment);
        this.setState({
            edditing: false 
        });
    }
    handleCommentDeleted() {
        this.props.onCommentDeleted({id: this.props.id});
    }
    renderText() {
        return (
            <div className="panel-body" dangerouslySetInnerHTML={this.rawMarkup()}></div>
        );
    }
    renderEdit() {
        return(
            <ComentariosForm onCommentSubmit={this.handleCommentEdited.bind(this)}>{this.props.children}</ComentariosForm>
        );
    }
    render() {
        return (
                <div className="row">
                    <div className="col-sm-2">
                        <div className="thumbnail">
                            <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="panel panel-default actions-list">
                            <div className="panel-heading">
                                <strong>{this.props.author}</strong> <span className="text-muted">commented {moment(this.props.updatedAt).fromNow()}</span>
                                    <div className="actions">
                                        <ActionButton>
                                            <ActionButton.Item onClick={ this.handleCommentDeleted.bind(this) }>Borrar</ActionButton.Item>
                                            <ActionButton.Item onClick={ this.editMode.bind(this) }>Editar</ActionButton.Item>
                                        </ActionButton>
                                    </div>
                            </div>
                            {
                                this.state.edditing ? this.renderEdit() : this.renderText()
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

export default Comentario;
