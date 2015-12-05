import React, { PropTypes } from 'react';
import ActionButton from '../ActionButton';

class Temporada extends React.Component {
    render () {
        return (
            <div className="btn-group actions-list">
                <button className="btn btn-default" id={'temporada_' + this.props.id} onClick={this.props.onClick}>
                    {this.props.children}
                </button>
                <div className="actions">
                    <ActionButton>
                        <ActionButton.Item>Borrar</ActionButton.Item>
                    </ActionButton>
                </div>
            </div>
        );
    }
}

export default Temporada   ;
