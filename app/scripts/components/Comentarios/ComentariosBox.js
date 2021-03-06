import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import CommentForm from './ComentariosForm';
import CommentList from './ComentariosList';
import {comentariosActions} from '../../Actions';

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
            comentariosActions.updateComment(dispatch, token, serie, season, episode, comment, data);
        },
        deleteComment: (token, serie, season, episode, comment) => {
            comentariosActions.deleteComment(dispatch, token, serie, season, episode, comment);
        },
        newComment: (token, serie, season, episode, data) => {
            comentariosActions.newComment(dispatch, token, serie, season, episode, data);
        },
        updateSerieComment: (token, serie, comment, data) => {
            comentariosActions.updateSerieComment(dispatch, token, serie, comment, data);
        },
        deleteSerieComment: (token, serie, comment) => {
            comentariosActions.deleteSerieComment(dispatch, token, serie, comment);
        },
        newSerieComment: (token, serie, data) => {
            comentariosActions.newSerieComment(dispatch, token, serie, data);
        }
    }
};

class ComentariosBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data : [] };
    }
    handleCommentSubmit(comment) {
        this.props.toSerie ?
        this.props.newSerieComment(this.props.token, this.props.serie.id, comment) :
        this.props.newComment(this.props.token, this.props.serie.id, this.props.temporada, this.props.capitulo, comment);
    }
    handleCommentEdited(comment) {
        this.props.toSerie ?
        this.props.updateSerieComment(this.props.token, this.props.serie.id, comment.id, comment) :
        this.props.updateComment(this.props.token, this.props.serie.id, this.props.temporada, this.props.capitulo, comment.id, comment);
    }
    handleCommentDeleted(comment) {
        this.props.toSerie ?
        this.props.deleteSerieComment(this.props.token, this.props.serie.id, comment.id) :
        this.props.deleteComment(this.props.token, this.props.serie.id, this.props.temporada, this.props.capitulo, comment.id)
    }
    render () {
        return (
            <div className='commentBox'>
                <h4>Comentarios</h4>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
                <CommentList data={this.props.data} onCommentEdited={this.handleCommentEdited.bind(this)} onCommentDeleted={this.handleCommentDeleted.bind(this)}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComentariosBox);
