/*import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import Home from './components/home';
import router from './router';

const mountNode = document.getElementById('app');
router.start(() => {
    ReactDOM.render(
        <RouterProvider router={ router }><Home /></RouterProvider>,
        mountNode
    );
});
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route, IndexRoute, HistoryLocation} from 'react-router';
import routes from './Routes';
import Nav from './Components/Nav';

ReactDOM.render( Nav, document.getElementById('nav'));
ReactDOM.render( routes, document.getElementById('app'));
