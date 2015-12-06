import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import CommentForm from './ComentariosForm';
import CommentList from './ComentariosList';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token
    }
}

class ComentariosBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data : [] };
    }
    handleCommentSubmit(comment) {
        if(this.props.token) {
            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada/' + this.props.temporada + '/capitulo/' + this.props.capitulo + '/comentario',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                type: 'POST',
                data: comment,
                success: function(data) {
                    this.loadCommentsFromServer(this.props.temporada, this.props.capitulo);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
    handleCommentEdited(comment) {
        if(this.props.token) {
            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada/' + this.props.temporada + '/capitulo/' + this.props.capitulo + '/comentario/' + comment.id,
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                type: 'PUT',
                data: comment,
                success: function(data) {
                    this.loadCommentsFromServer(this.props.temporada, this.props.capitulo);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
    handleCommentDeleted(comment) {
        if(this.props.token) {
            $.ajax({
                url: config.api.url + '/series/' + this.props.serie + '/temporada/' + this.props.temporada + '/capitulo/' + this.props.capitulo + '/comentario/' + comment.id,
                headers: {
                    'Authorization' : 'Bearer ' + this.props.token
                },
                type: 'DELETE',
                success: function(data) {
                    this.loadCommentsFromServer(this.props.temporada, this.props.capitulo);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        else {
            this.props.dispatch({
                type: 'TOGGLE_MODAL'
            })
        }
    }
    loadCommentsFromServer(temporada, capitulo) {
        $.ajax({
            url: config.api.url + '/series/' + this.props.serie + '/temporada/' + temporada + '/capitulo/' + capitulo,
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                this.setState({data: data.comentarios});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    data:[]
                });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.capitulo != undefined) {
            this.loadCommentsFromServer(nextProps.temporada, nextProps.capitulo);
        }

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

export default connect(mapStateToProps)(ComentariosBox);
