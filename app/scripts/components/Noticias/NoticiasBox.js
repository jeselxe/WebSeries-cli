import React, { PropTypes } from 'react';
import NoticiasList from './NoticiasList';
import config from '../../config';
import newsSections from '../../utils/noticiasSections';

class NoticiasBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data : [] };
    }
    loadNoticiasFromServer(section) {
        console.log('loadNoticiasFromServer');
        $.ajax({
            url: config.api.url + '/tviso/noticias/' + section,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    componentDidMount() {
        this.loadNoticiasFromServer(this.props.params.section);
    }
    componentWillReceiveProps(nextProps) {
        this.loadNoticiasFromServer(nextProps.params.section);
    }
    render () {
        return (
            <div className="noticias">
                <legend>{newsSections(this.props.params.section)}</legend>
                <NoticiasList data={ this.state.data } />
            </div>
        )
    }
}

export default NoticiasBox;
