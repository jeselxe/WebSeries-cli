import React from 'react';
import {connect} from 'react-redux';
import Tabs from 'react-simpletabs';
import TemporadasBox from '../Temporadas/TemporadasBox';
import InfoSerie from './InfoSerie';
import {seriesActions} from '../../Actions';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        data: state.series.serie
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSerie: (id) => {
            seriesActions.getSerie(dispatch, id);
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
                        <TemporadasBox />
                    </Tabs.Panel>
                    <Tabs.Panel title="Información">
                        <InfoSerie title={this.props.data.title} comentarios={this.props.data.comentarios} />
                    </Tabs.Panel>
                </Tabs>

            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Serie);
