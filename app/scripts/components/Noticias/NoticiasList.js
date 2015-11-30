import React, { PropTypes } from 'react';
import {Link} from 'react-router';

class NoticiasList extends React.Component {
    render () {
        var NoticiasNodes = this.props.data.map(function (noticia) {
            return (
                <Link to={`/noticia/${noticia.idn}`} className="list-group-item" key={noticia.idn}>{ $('<div />').html(noticia.title).text() }</Link>
            );
        })
        return (
            <div className="list-group">
                {NoticiasNodes}
            </div>
        )
    }
}

export default NoticiasList;
