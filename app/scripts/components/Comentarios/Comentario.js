import React, { PropTypes } from 'react';
import marked from 'marked';

class Comentario extends React.Component {
    rawMarkup () {
        var markup = marked(this.props.children.toString(), {sanitize: true});
        return { __html : markup};
    }

    render() {
        return (
            <div className="comment">
                <h3 className="commentAuthor">
                  {this.props.author}
                </h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}

export default Comentario;
