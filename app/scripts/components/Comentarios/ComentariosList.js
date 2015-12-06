import React, { PropTypes } from 'react';
import Comment from './Comentario';

class ComentariosList extends React.Component {
    render () {
        var CommentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.UsuarioId} id={comment.id} onCommentEdited={this.props.onCommentEdited} onCommentDeleted={this.props.onCommentDeleted} updatedAt={comment.updatedAt} key={comment.id}>
                    {comment.comment}
                </Comment>
            );
        }.bind(this));
        return (
            <div className="commentList">
                {CommentNodes}
            </div>
        );
    }
}

export default ComentariosList;
