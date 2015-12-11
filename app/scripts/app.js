import React from 'react';
import ReactDOM from 'react-dom';
import {syncReduxAndRouter} from 'redux-simple-router';
import {createHashHistory} from 'history';
import Routes from './Routes';
import Nav from './Components/Nav';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducers from './Reducers';

const store = createStore(Reducers);
const history = createHashHistory();

syncReduxAndRouter(history,store);

ReactDOM.render(<Provider store={store}><Routes history={history} /></Provider>, document.getElementById('app'));
