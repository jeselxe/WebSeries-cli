import React, { PropTypes } from 'react';
import {Chart} from 'react-google-charts';
import config from '../../config';

class Grafica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            options: {
                title: 'Visualizaciones',
                hAxis: {
                    title: 'Date',
                    format: 'MMM d'
                },
                vAxis: {title: 'Views'},
                legend : 'none',
                backgroundColor: {
                    fill: "transparent"
                },
            },
            columns:[],
            rows: []
        }
    }
    getVisualizaciones(title) {
        $.ajax({
            url: config.api.url + '/tviso/visualizaciones',
            data: {
                title
            },
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.drawChart(data.data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    drawChart(data) {
        let rows = [];
        data.forEach((item) => {
            rows.push([new Date(item.date), item.views]);
        });
        let columns = [
            {
                type: 'date',
                label: 'Date'
            },
            {
                type: 'number',
                label: 'Views'
            }
        ]
        this.setState({
            rows,
            columns
        });
        this.forceUpdate();
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.getVisualizaciones(this.props.title);
    }
    render () {
        return (
            <div className="">
                <Chart
                    chartType="LineChart"
                    width={"100%"}
                    height={"300px"}
                    rows={this.state.rows}
                    columns={this.state.columns}
                    options={this.state.options}
                    graph_id="graph_visualizations"
                />
            </div>
        );
    }
}

export default Grafica;
