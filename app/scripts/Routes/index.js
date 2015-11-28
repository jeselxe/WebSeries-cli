import React from 'react';
import {Router, Route, IndexRoute, HistoryLocation} from 'react-router';
import Series from '../Components/Series/SeriesBox';
import Serie from '../Components/Series/Serie';
import Noticias from '../Components/Noticias/NoticiasBox';
import Noticia from '../Components/Noticias/Noticia';

export default (
     <Router history={HistoryLocation} >
          <Route component="App" path='/'>
           <IndexRoute component={Series} />
           <Route path="series" component={Series} />
           <Route path="serie/:id" component={Serie} />
           <Route path="noticias/:section" component={Noticias}/>
           <Route path="noticia/:id" component={Noticia}/>
         </Route>
     </Router>
 );
