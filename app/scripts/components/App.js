import React, {Component} from 'react';
import Nav from './Nav';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div className="container">{this.props.children}</div>
            </div>
        );
    }
}


export default App;
