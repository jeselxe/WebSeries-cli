import React from 'react';
import TemporadasList from './TemporadasList';
import CapitulosBox from '../Capitulos/CapitulosBox';

class TemporadasBox extends React.Component {
    render() {
        return (
            <div className="temporadas">
                <TemporadasList />
                <CapitulosBox />
            </div>
        );
    }
}

export default TemporadasBox;
