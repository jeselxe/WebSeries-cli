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
                            <ActionButton.Item>Borrar</ActionButton.Item>
                            <ActionButton.Item>Editar</ActionButton.Item>
                        </ActionButton>
                    </div>
                </div>
            );
        })
        return (
            <div className="SeriesList list-group">
                { (this.props.data.length < 1) ?
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
                :
                <div></div>}

                {SeriesNodes}
                <Link to="nueva_serie" className="list-group-item list-group-item-info"><span className="glyphicon glyphicon-plus"></span></Link>
            </div>
        );
    }
}


export default SeriesList;
