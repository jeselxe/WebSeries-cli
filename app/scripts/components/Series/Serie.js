import React from 'react';
import Tabs from 'react-simpletabs';
import TemporadasBox from '../Temporadas/TemporadasBox';
import InfoSerie from './InfoSerie';
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
        this.loadSerieFromServer();
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2>{this.state.data.title}</h2>
                    <p>{this.state.data.description}</p>
                </div>
                <Tabs>
                    <Tabs.Panel title="Temporadas">
                        <TemporadasBox serie={this.props.params.id} data={this.state.data} />
                    </Tabs.Panel>
                    <Tabs.Panel title="Información">
                        <InfoSerie />
                    </Tabs.Panel>
                </Tabs>

            </div>
        );
    }
}


export default Serie;
