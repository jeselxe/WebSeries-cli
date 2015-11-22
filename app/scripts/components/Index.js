import React from 'react';
import Nav from './Nav';
import Main from './Main';
import Routes from '../Routes';

export default class Index extends React.Component {
  render() {
      console.log('render');
    return (
      <div>
          <Nav />
          <main className="container">
              {this.props.children}
          </main>
      </div>
    );
  }
}
