'use strict';
var path = require('path');
var gulp       = require('gulp');
var bs         = require('browser-sync');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require("browserify");
var babelify   = require("babelify");
var _          = require("lodash");
var envify     = require('envify/custom');
var nodemon    = require('gulp-nodemon');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var cssNano  = require('gulp-cssnano');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var vendors    = require('./../vendors');
var appRoot = path.normalize(__dirname + './../../src/')

gulp.task('config-dev', function(){
    var variables = require('./../../app-secrets-dev.json');
    
    process.env.NODE_ENV = variables.env
    process.env.API_URL = variables.api.url
    process.env.API_PORT = variables.api.port
    process.env.API_PROXY_URL = variables.api.proxy.url
    process.env.API_PROX_PORT = variables.api.proxy.port
    
    return
})

gulp.task('config-prod', function(){
    var variables = require('./../../app-secrets-prod.json');
    
    process.env.NODE_ENV = variables.env
    process.env.API_URL = variables.api.url
    process.env.API_PORT = variables.api.port
    
    return
})

gulp.task('build:vendors', function() {
  var b = browserify({
          insertGlobals: true,
          detectGlobals: true
        })

  _.forEach(vendors, function(vendor) {
    b.require(vendor.file, { expose: vendor.expose })
  })

  return b
    .bundle()
    .pipe(source('vendors.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(bs.stream());
});
 
gulp.task('build:sass', function () {
    gulp.src(appRoot + 'app/sass/Main.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths : [appRoot + 'app/sass']
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(cssNano())
      .pipe(rename('main.css'))
      .pipe(gulp.dest('./dist'))
      .pipe(bs.stream());
});

gulp.task('build:sync', ['config-dev', 'build:app', 'build:sass', 'build:vendors'], function() {
  bs({
      proxy: "localhost:8080",
      open: true
  });

  gulp.watch(appRoot + 'app/**/*.js', ['config-dev', 'build:app'], bs.reload);
  gulp.watch(appRoot + 'app/**/*.jsx', ['config-dev', 'build:app'], bs.reload);
  gulp.watch(appRoot + 'server/*.js', ['config-dev', 'build:app'], bs.reload);
  gulp.watch(appRoot + 'app/sass/**/*.scss', ['build:sass'], bs.reload);
  gulp.watch('./build/vendors.js', ['build:vendors'], bs.reload);

  var started = false;
  nodemon({
    script: appRoot + 'index.js',
    stdin: true,
    restartable: true,
    exec: 'babel-node --stage 0',
    ignore: ["node_modules/**", "dist/**", "build/**"]
  }).on('start', function() {
      if (!started){
        started = true;
      }
    })
})

gulp.task('build:app', function() {
  var b = browserify({
            insertGlobals: false,
            detectGlobals: false,
            debug: true
          })

  _.forEach(vendors, function(vendor) {
    b.external(vendor.file)
  })
  
  b.add(appRoot + 'app/index.jsx');

  return b
        .transform(babelify.configure({
          stage: 0
        }))
        .transform(envify({
          _: 'purge',
          NODE_ENV: process.env.NODE_ENV,
          API_URL: process.env.API_URL,
          CLIENT: true
        }),{
          global: true
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))        
        .pipe(gulp.dest('./dist'))
        .pipe(bs.stream());
});