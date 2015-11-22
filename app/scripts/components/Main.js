import React, { createElement } from 'react';
import { routeNode } from 'react-router5';
import SeriesBox from './Series/SeriesBox';
import Serie from './Series/Serie';
import Noticias from './Noticias/Noticias';
import NotFound from './NotFound';

const components = {
    'series':   SeriesBox,
    'noticias': Noticias,
    'series.serie': Serie
};

function Main(props) {
    const { route } = props;
    const segment = route.name;
    return createElement(components[segment] || NotFound);
}

export default routeNode('')(Main);
