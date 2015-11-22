import React, { PropTypes } from 'react';
import Comment from './Comentario';

class ComentariosList extends React.Component {
    render () {
        var CommentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.UsuarioId} key={comment.id}>
                    {comment.comment}
                </Comment>
            );
        })
        return (
            <div className="commentList">
                {CommentNodes}
            </div>
        );
    }
}

export default ComentariosList;
