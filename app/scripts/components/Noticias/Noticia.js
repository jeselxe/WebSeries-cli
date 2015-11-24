import React, { PropTypes } from 'react';
import config from '../../config';
import marked from 'marked';

class Noticia extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    loadNoticiaFromServer() {
        $.ajax({
            url: config.api.url + '/tviso/noticias/' + this.props.params.id,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadNoticiaFromServer();
    }
    rawMarkup (text) {
        var markup;
        if(text) {
            markup = marked(text, {sanitize: true});
        }
        return { __html : markup};
    }
    render () {
        return (
            <div>
                <h1>{this.state.data.title}</h1>
                <span dangerouslySetInnerHTML={ this.rawMarkup(this.state.data.text) }></span>
            </div>
        )
    }
}

export default Noticia;
