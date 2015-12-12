'use strict';

var gulp       = require('gulp');
var $          = require('gulp-load-plugins')(); // Carga los plugins de gulp indicados en package.json
var sync       = $.sync(gulp).sync;
var del        = require('del');
var browserify = require('browserify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var path       = require('path');

require('harmonize')();

var bundler = {
  w: null,
  init: function() {
    this.w = watchify(browserify({  // A la espera de cambios para volver a generar el bundle
      entries: ['./app/scripts/app.js'], // archivo de entrada
      insertGlobals: true, // Salta la detección e inserta las definiciones, lo que mejora la velocidad de la construcción
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function() {
    return this.w && this.w.bundle() // genera el bundle
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/scripts')); // Destino del bundle
  },
  watch: function() {
    this.w && this.w.on('update', this.bundle.bind(this)); // Evento de watchify para ejecutar de nuevo la creación del bundle
  },
  stop: function() {
    this.w && this.w.close(); // cierra el seguimiento de archivos de watchify
  }
};

gulp.task('styles', function() {
  return $.rubySass('app/styles/main.scss', { // Plugin para compilar Sass a CSS
      style: 'expanded',
      precision: 10,
      loadPath: ['app/bower_components']
    })
    .on('error', $.util.log.bind($.util, 'Sass Error'))
    .pipe($.autoprefixer('last 1 version')) // Gestiona los prefijos de las propiedades CSS para distintos navegadores
    .pipe(gulp.dest('dist/styles')) // Destino del CSS
    .pipe($.size()); // Muestra el tamaño del archivo
});

gulp.task('scripts', function() {
  bundler.init();   // Inicializa las opciones de Browserify
  return bundler.bundle(); // Crea el bundle
});

gulp.task('html', function() { // Parsea los 'build blocks' del html, obteniendo los js y unificándolos en un archivo
  var assets = $.useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function() { // Optimiza las imágenes y las almacena en la carpeta de destino
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function() { // Copia las fuentes en la carpeta de destino
  return gulp.src(['app/fonts/**/*', 'app/bower_components/bootstrap-sass-official/assets/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('extras', function () { // copia los txt e iconos en la carpeta de destino
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('serve', function() { // Ejecuta el servidor local
  gulp.src('dist')  // Carpeta que se va a cargar en el servidor
    .pipe($.webserver({
      livereload: true, // recarga cada vez que hay un cambio
      port: 9000,
      open: true    // Se abre el navegador automáticamente
    }));
});

gulp.task('set-production', function() { // Asigna la variable de producción
  process.env.NODE_ENV = 'production';
});

gulp.task('minify:js', function() { // Minifica los js
  return gulp.src('dist/scripts/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe($.size());
});

gulp.task('minify:css', function() { // Minifica el css
  return gulp.src('dist/styles/**/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size());
});

gulp.task('minify', ['minify:js', 'minify:css']); // Ejecuta las tareas minify:js, minify:css

gulp.task('clean', del.bind(null, 'dist')); // Borra la carpeta de distribución

gulp.task('bundle', ['html', 'styles', 'scripts', 'images', 'fonts', 'extras']); // Ejecuta las tareas  html, styles, scripts, fonts, images, extras

gulp.task('clean-bundle', sync(['clean', 'bundle'])); // Ejecuta las tareas clean y bundle de forma síncrona

gulp.task('build', ['clean-bundle'], bundler.stop.bind(bundler)); // Ejecuta la tarea clean-bundle y el script bundler.stop

gulp.task('build:production', sync(['set-production', 'build', 'minify'])); // Ejecuta las tareas set-production, build, minify de forma síncrona

gulp.task('serve:production', sync(['build:production', 'serve'])); // Ejecuta las tareas build:production, serve de forma síncrona

gulp.task('default', ['build']); // La tarea por defecto, que ejecuta build

gulp.task('watch', sync(['clean-bundle', 'serve']), function() { // clean-bundle, serve y está a la espera de cambios en los ficheros para lanzar las tareas correspondientes automáticamente
  bundler.watch();
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});
