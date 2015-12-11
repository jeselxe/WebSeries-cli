import React, {Component} from 'react';
import { Link } from 'react-router';
import LoginBox from './Login/LoginBox';

export default class Nav extends Component {
    render() {
        return(
            <nav className="navbar navbar-inverse">

                <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#my-navbar" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">WebSeries</a>
                    </div>


                <div className="collapse navbar-collapse" id="my-navbar">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/series">Series</Link>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Noticias <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><Link to="/noticias/ultimas">Últimas</Link></li>
                                <li><Link to="/noticias/top">top</Link></li>
                                <li><Link to="/noticias/mas_vistas">Más vistas</Link></li>
                                <li><Link to="/noticias/mas_votadas">Más votadas</Link></li>
                                <li><Link to="/noticias/promocionadas">Promocionadas</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <LoginBox />
                </div>
            </nav>
        );
    }
}
