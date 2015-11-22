import React from 'react';
import Nav from './Nav';
import Main from './Main';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
          <Nav />
          <main className="container">
              <Main />
          </main>
      </div>
    );
  }
}
