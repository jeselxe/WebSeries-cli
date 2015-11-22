import React from 'react';
import { routeNode } from 'react-router5';
import TemporadasBox from '../Temporadas/TemporadasBox';
import config from '../../config';

class Serie extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    loadSerieFromServer() {
        $.ajax({
            url: config.api.url + '/series/' + this.props.params.id,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.serie});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        /*this.setState({
            data: {
                serie : {}
            }
        });*/
        this.loadSerieFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2>{this.state.data.title}</h2>
                    <p>{this.state.data.description}</p>
                </div>
                <TemporadasBox serie={this.props.params.id} data={this.state.data} />
            </div>
        );
    }
}


export default Serie;
