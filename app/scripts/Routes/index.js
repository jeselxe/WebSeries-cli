import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Series from '../Components/Series/SeriesBox';
import Serie from '../Components/Series/Serie';
import SerieForm from '../Components/Series/SerieForm';
import Noticias from '../Components/Noticias/NoticiasBox';
import Noticia from '../Components/Noticias/Noticia';
import Register from '../Components/Login/Register';
import App from '../Components/App';

export default class Routes extends React.Component {
    render() {
    return (
     <Router history={this.props.history}>
          <Route component={App} path='/'>
           <IndexRoute component={Series} />
           <Route path="series" component={Series} />
           <Route path="nueva_serie" component={SerieForm} />
           <Route path="serie/:id" component={Serie} />
           <Route path="noticias/:section" component={Noticias}/>
           <Route path="noticia/:id" component={Noticia}/>
           <Route path="register" component={Register}/>
         </Route>
     </Router>
 );
 }
 }
