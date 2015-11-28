import React from 'react';
import ReactDOM from 'react-dom';
import routes from './Routes';
import Nav from './Components/Nav';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducers from './Reducers';

const store = createStore(Reducers);

ReactDOM.render(<Provider store={store}>{Nav}</Provider>, document.getElementById('nav'));
ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));
