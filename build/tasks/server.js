'use strict';
var gulp       = require('gulp');
var bs         = require('browser-sync').create();
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require("browserify");
var babelify   = require("babelify");
var _          = require("lodash");
var nodemon    = require('gulp-nodemon');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var minifyCSS  = require('gulp-minify-css');

var vendors    = require('./../vendors');

var appRoot = './src/'

gulp.task('server:client', function (cb) {
  var started = false;
    nodemon({
        script: appRoot + 'index.js',
        exec: 'babel-node --stage 0',
        ignore: ["node_modules/**",  appRoot + "app/**", "dist/**", "build/**"],
        tasks: []
  }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true; 
        } 
    });
});

gulp.task('server:dev', ['server:client'], function() {
    bs.init({
        proxy: "localhost:8080/"
    });

    gulp.watch(appRoot + 'app/**/*.js', ['build:app'], bs.reload);
    gulp.watch(appRoot + '/app/sass/**/*.scss', ['build:sass'], bs.reload);
    gulp.watch('./build/vendors.js', ['build:vendors'], bs.reload);
});

gulp.task('build:vendors', function() {
  var b = browserify({
          insertGlobals : false,
            debug : !process.env.NODE_ENV
        })

  _.forEach(vendors, function(vendor) {
   b.require(vendor.file, { expose: vendor.expose })
  })

  return b
    .bundle()
    .pipe(source('vendors.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
    .pipe(bs.stream());
});
 
gulp.task('build:sass', function () {
    gulp.src(appRoot + 'app/sass/Main.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths : [appRoot + 'app/sass/']
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(rename('main.css'))
      .pipe(gulp.dest('./dist'))
      .pipe(bs.stream());
});

gulp.task('build:app', function() {
  var b = browserify({
          insertGlobals : false,
            debug : !process.env.NODE_ENV
        })

  _.forEach(vendors, function(vendor) {
    b.external(vendor.file)
  })

  b.add(appRoot + 'app/client.js');

  return b
        .transform(babelify.configure({
          optional: [
          'es7.decorators',
          'es7.asyncFunctions',
          'es7.classProperties'
          ]
        }))
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(bs.stream());
});