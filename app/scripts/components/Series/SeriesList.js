import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const mapStateToProps = (state) => {
    return {
        data: state.series.series
    }
}

class SeriesList extends React.Component {
    render() {
        var SeriesNodes = this.props.data.map(function (serie) {
            return (
                    <Link to={`/serie/${serie.id}`} className="list-group-item" key={serie.id}>
                        <h4 class="list-group-item-heading">{serie.title}</h4>
                        <p class="list-group-item-text">{serie.description}</p>
                    </Link>
            );
        }.bind(this));
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


export default connect(mapStateToProps)(SeriesList);
