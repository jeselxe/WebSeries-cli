import React from 'react';
import {Router, Route, IndexRoute, HistoryLocation} from 'react-router';
import App from './Components/Index';
import Series from './Components/Series/SeriesBox';
import Serie from './Components/Series/Serie';
import Noticias from './Components/Noticias/Noticias';

export default (
             <Router history={HistoryLocation} >
                  <Route component="App" path='/'>
                   <IndexRoute component={Series} />
                   <Route path="series" component={Series} />
                   <Route path="serie/:id" component={Serie} />
                   <Route path="noticias" component={Noticias}/>
                 </Route>
             </Router>
         );
