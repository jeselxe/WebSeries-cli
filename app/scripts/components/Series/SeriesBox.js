import React from 'react';
import {connect} from 'react-redux';
import SeriesList from './SeriesList';
import config from '../../config';

const mapDispatchToProps = (dispatch) => {
    return {
        getSeries : () => {
            $.ajax({
                url: config.api.url + '/series',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    dispatch({
                        type: 'GET_SERIES',
                        series: data.series
                    })
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }
}

class SeriesBox extends React.Component {
    componentDidMount() {
        this.props.getSeries();
    }

    render() {
        return (
            <SeriesList />
        );
    }

}

export default connect(null, mapDispatchToProps)(SeriesBox);
