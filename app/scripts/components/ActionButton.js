import React, { PropTypes } from 'react';
import listensToClickOutside from 'react-onclickoutside/decorator';

@listensToClickOutside()
class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled : false
        }
    }
    componentWillReceiveProps(nextProps) {

    }
    handleClickOutside(event) {
        this.setState({
            toggled: false
        });
    }
    toggle() {
        this.setState({
            toggled: !this.state.toggled
        });
        this.forceUpdate();
    }
    render () {
        return(
            <nav className={"cd-stretchy-nav edit-content " + (this.state.toggled ? "nav-is-visible" : "") }>
                <a className="cd-nav-trigger" onClick={this.toggle.bind(this)}>
                    <span aria-hidden="true"></span>
                </a>
                <ul>
                    {this.props.children}
                </ul>
                <span aria-hidden="true" className="stretchy-nav-bg"></span>
            </nav>
        );
    }
}

ActionButton.Item = React.createClass({
    render () {
        return (
            <li><a className="edit" onClick={this.props.onClick}><span>{this.props.children}</span></a></li>
        );
    }
});

export default ActionButton;
