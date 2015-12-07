import React from 'react';
import {connect} from 'react-redux';
import SeriesList from './SeriesList';
import config from '../../config';
import serieActions from '../../Actions/series';

const mapDispatchToProps = (dispatch) => {
    return {
        getSeries : () => {
            serieActions.getSeries(dispatch);
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
