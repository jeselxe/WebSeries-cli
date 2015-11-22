import React, { PropTypes } from 'react'

class Temporada extends React.Component {
    render () {
        return (
            <div className="btn-group">
                <button className="btn btn-default" id={'temporada_' + this.props.id} onClick={this.props.onClick}>{this.props.children}</button>
            </div>
        );
    }
}

export default Temporada   ;
