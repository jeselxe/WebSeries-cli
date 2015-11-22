import React from 'react';
import { Link } from 'react-router';

export default (
        <nav className="navbar navbar-default">

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
                    <li>
                        <a href="#/noticias">Noticias</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
