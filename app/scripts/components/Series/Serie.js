import React from 'react';
import {connect} from 'react-redux';
import Tabs from 'react-simpletabs';
import TemporadasBox from '../Temporadas/TemporadasBox';
import InfoSerie from './InfoSerie';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        data: state.series.serie
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSerie: (id) => {
            $.ajax({
                url: config.api.url + '/series/' + id,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    dispatch({
                        type: 'SELECT_SERIE',
                        serie: data.serie
                    });
                },
                error: function(xhr, status, err) {
                    console.error(config.api.url, status, err.toString());
                }
            });
        }
    }
}

class Serie extends React.Component {
    componentDidMount() {
        this.props.getSerie(this.props.params.id);
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2>{this.props.data.title}</h2>
                    <p>{this.props.data.description}</p>
                </div>
                <Tabs>
                    <Tabs.Panel title="Temporadas">
                        <TemporadasBox serie={this.props.params.id} data={this.props.data} />
                    </Tabs.Panel>
                    <Tabs.Panel title="Información">
                        <InfoSerie title={this.props.data.title} />
                    </Tabs.Panel>
                </Tabs>

            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Serie);
