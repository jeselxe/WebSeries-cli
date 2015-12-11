import React, {Component} from 'react';
import Nav from './Nav';
import Notification from './Notification';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div className="container">{this.props.children}</div>
                <Notification />
            </div>
        );
    }
}


export default App;
