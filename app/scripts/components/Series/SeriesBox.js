import React from 'react';
import {connect} from 'react-redux';
import SeriesList from './SeriesList';
import config from '../../config';
import {seriesActions} from '../../Actions';

const mapDispatchToProps = (dispatch) => {
    return {
        getSeries : () => {
            seriesActions.getSeries(dispatch);
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
