import React from 'react';
import ReactDOM from 'react-dom';
import routes from './Routes';
import Nav from './Components/Nav';

ReactDOM.render( Nav, document.getElementById('nav'));
ReactDOM.render( routes, document.getElementById('app'));
