# WebSeries-cli
Client for WebSeries made in React

## Ejecutar programa

```
npm install
gulp watch
```

### Tareas de gulp

* **styles**
    Obtener el CSS a partir de los ficheros scss
* **scripts**
    crea un bundle con los archivos js del proyecto
* **html**
    Copia los html en la carpeta de distribución
* **fonts**
    Copia las fuentes en la carpeta de distribución
* **images**
    Copia las imágenes optimizadas en la carpeta de distribución
* **extras**
    Copia los extras en la carpeta de distribución
* **serve**
    lanza un servidor local con la aplicación corriendo
* **jest**
    paso de tests
* **set-production**
    establece la variable de entorno de producción
* **minify:js**
    minifica el js
* **minify:css**
    minifica el css
* **minify**
    minify:js, minify:css
* **clean**
    Borra la carpeta de distribución
* **bundle**
    html, styles, scripts, fonts, images, extras
* **clean-bundle**
    clean, bundle
* **build**
    clean-bundle
* **build:production**
    set-production, build, minify
* **serve:production**
    build:production, serve
* **test**
    jest
* **watch**
    clean-bundle, serve y está a la espera de cambios en los ficheros para lanzar las tareas correspondientes automáticamente
* **default**
    build
