import { Router5 } from 'router5';
import listenersPlugin from 'router5-listeners';
import historyPlugin from 'router5-history';

const router = new Router5()
    .setOption('useHash', true)
    //.setOption('hashPrefix', '!')
    .setOption('defaultRoute', 'series')
    .setOption('autoCleanUp', true)
    // Routes
    .addNode('series',         '/series')
    .addNode('series.serie', '/:id')
    .addNode('noticias',       '/noticias')
    // Plugins
    .usePlugin(Router5.loggerPlugin())
    .usePlugin(listenersPlugin())
    .usePlugin(historyPlugin());

export default router;
