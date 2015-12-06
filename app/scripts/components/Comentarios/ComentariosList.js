import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Comment from './Comentario';

const mapStateToProps = (state) => {
    return {
        data: state.series.comentarios
    }
};

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

export default connect(mapStateToProps)(ComentariosList);
