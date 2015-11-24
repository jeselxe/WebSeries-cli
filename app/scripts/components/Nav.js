import React from 'react';
import { Link } from 'react-router';

export default (
        <nav className="navbar navbar-inverse">

            <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">WebSeries</a>
                </div>


            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#/series">Series</a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Noticias</a>
                        <ul className="dropdown-menu">
                            <li><a href="#/noticias/ultimas">Últimas</a></li>
                            <li><a href="#/noticias/interesantes">Interesantes</a></li>
                            <li><a href="#/noticias/top">top</a></li>
                            <li><a href="#/noticias/mas_vistas">Más vistas</a></li>
                            <li><a href="#/noticias/mas_votadas">Más votadas</a></li>
                            <li><a href="#/noticias/promocionadas">Promocionadas</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
