import React, { PropTypes } from 'react';
import {Link} from 'react-router';

class NoticiasList extends React.Component {
    render () {
        var NoticiasNodes = this.props.data.map(function (noticia) {
            return (
                <li key={noticia.idn}>
                    <Link to={`/noticia/${noticia.idn}`}>{noticia.title}</Link>
                </li>
            );
        })
        return (
            <ul className="noticias-list">
                {NoticiasNodes}
            </ul>
        )
    }
}

export default NoticiasList;
