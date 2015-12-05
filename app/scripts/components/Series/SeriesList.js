import React from 'react';
import {Link} from 'react-router';
import ActionButton from '../ActionButton';

class SeriesList extends React.Component {
    render() {
        var SeriesNodes = this.props.data.map(function (serie) {
            return (
                <div className="list-group-item actions-list" key={serie.id}>
                    <Link to={`/serie/${serie.id}`}>
                        {serie.title}
                    </Link>
                    <div className="actions">
                        <ActionButton>
                            <ActionButton.Item>Editar</ActionButton.Item>
                            <ActionButton.Item>Borrar</ActionButton.Item>
                        </ActionButton>
                    </div>
                </div>
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
