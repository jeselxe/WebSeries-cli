import React from 'react';
import {Link} from 'react-router';

class SeriesList extends React.Component {
    render() {
        var SeriesNodes = this.props.data.map(function (serie) {
            return (
                <Link to={`/serie/${serie.id}`} className="serie list-group-item" key={serie.id}>{serie.title}</Link>
            );
        })
        return (
            <div className="SeriesList list-group">
                {SeriesNodes}
                <Link to="nueva_serie" className="list-group-item list-group-item-info"><span className="glyphicon glyphicon-plus"></span></Link>
            </div>
        );
    }
}


export default SeriesList;
