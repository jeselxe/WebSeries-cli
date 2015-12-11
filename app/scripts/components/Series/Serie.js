import React from 'react';
import {connect} from 'react-redux';
import Tabs from 'react-simpletabs';
import TemporadasBox from '../Temporadas/TemporadasBox';
import InfoSerie from './InfoSerie';

import ActionButton from '../ActionButton';
import {seriesActions} from '../../Actions';
import config from '../../config';

const mapStateToProps = (state) => {
    return {
        token : state.login.token,
        data: state.series.serie
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSerie: (id) => {
            seriesActions.getSerie(dispatch, id);
        },
        updateSerie: (token, id, data) => {
            seriesActions.updateSerie(dispatch, token, id, data);
        },
        deleteSerie: (token, id) => {
            seriesActions.deleteSerie(dispatch, token, id);
        }
    }
}

class Serie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing : false
        }
    }
    componentDidMount() {
        this.props.getSerie(this.props.params.id);
    }
    toEdit() {
        this.setState({
            editing: true
        });
    }
    delete() {
        this.props.deleteSerie(this.props.token, this.props.params.id);
    }
    update() {
        this.setState({
            editing: false
        });
        this.props.updateSerie(this.props.token, this.props.params.id, {
            title: this.refs.title.value,
            description: this.refs.description.value
        });
    }
    renderInfo() {
        return (
            <div className="jumbotron actions-list">
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.description}</p>
                <div className="actions">
                    <ActionButton>
                        <ActionButton.Item onClick={this.delete.bind(this)}>Borrar</ActionButton.Item>
                        <ActionButton.Item onClick={this.toEdit.bind(this)}>Editar</ActionButton.Item>
                    </ActionButton>
                </div>
            </div>
        );
    }
    renderEditing() {
        return (
            <div className="jumbotron edit">
                <h2>
                    <input type="text" ref="title" className="form-control transparent" defaultValue={this.props.data.title} autoFocus />
                </h2>
                <p>
                    <textarea ref="description" className="form-control transparent" defaultValue={this.props.data.description} />
                </p>

                <button onClick={ this.update.bind(this) } className="btn btn-primary button">Editar</button>
            </div>
        )
    }
    render() {
        return (
            <div>
                    {this.state.editing ?
                        this.renderEditing()
                        :
                        this.renderInfo()
                    }
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
