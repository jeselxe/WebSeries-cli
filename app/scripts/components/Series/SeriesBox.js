import React from 'react';
import SeriesList from './SeriesList';
import config from '../../config';

class SeriesBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data : [] };
    }

    loadSeriesFromServer() {
        $.ajax({
            url: config.api.url + '/series',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.series});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadSeriesFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <SeriesList data={this.state.data} />
        );
    }

}

export default SeriesBox;
