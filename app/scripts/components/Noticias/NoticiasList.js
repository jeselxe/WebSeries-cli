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
                { (this.props.data.length < 1) ?
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
                :
                <div></div>}
                {NoticiasNodes}
            </div>
        )
    }
}

export default NoticiasList;
