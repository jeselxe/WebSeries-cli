import React from 'react';
import {Link} from 'react-router';

class SeriesList extends React.Component {
    render() {
        var SeriesNodes = this.props.data.map(function (serie) {
            return (
                <li className="serie" key={serie.id}>
                    <Link to={`/serie/${serie.id}`}>{serie.title}</Link>
                </li>
            );
        })
        return (
            <ul className="SeriesList">
                {SeriesNodes}
            </ul>
        );
    }
}


export default SeriesList;
