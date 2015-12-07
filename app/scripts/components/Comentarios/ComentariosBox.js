import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import CommentForm from './ComentariosForm';
import CommentList from './ComentariosList';
import serieActions from '../../Actions/series';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        serie : state.series.serie,
        temporada: state.series.temporada,
        capitulo: state.series.capitulo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateComment: (token, serie, season, episode, comment, data) => {
            serieActions.updateComment(dispatch, token, serie, season, episode, comment, data);
        },
        deleteComment: (token, serie, season, episode, comment) => {
            serieActions.deleteComment(dispatch, token, serie, season, episode, comment);
        },
        newComment: (token, serie, season, episode, data) => {
            serieActions.newComment(dispatch, token, serie, season, episode, data);
        }
    }
};

class ComentariosBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data : [] };
    }
    handleCommentSubmit(comment) {
        this.props.newComment(this.props.token, this.props.serie.id, this.props.temporada, this.props.capitulo, comment);
    }
    handleCommentEdited(comment) {
        this.props.updateComment(this.props.token, this.props.serie.id, this.props.temporada, this.props.capitulo, comment.id, comment);
    }
    handleCommentDeleted(comment) {
        this.props.deleteComment(this.props.token, this.props.serie.id, this.props.temporada, this.props.capitulo, comment.id)
    }
    render () {
        return (
            <div className='commentBox'>
                <h4>Comentarios</h4>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
                <CommentList onCommentEdited={this.handleCommentEdited.bind(this)} onCommentDeleted={this.handleCommentDeleted.bind(this)}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComentariosBox);
