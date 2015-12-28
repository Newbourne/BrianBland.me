'use strict';
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require("browserify");
var babelify   = require("babelify");
var _          = require("lodash");
var envify     = require('envify/custom');
var nodemon    = require('gulp-nodemon');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var minifyCSS  = require('gulp-minify-css');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var vendors    = require('./../vendors');

var appRoot = './src/'

gulp.task('server', [], function() {
    gulp.watch(appRoot + 'app/**/*.js', ['build:app']);
    gulp.watch(appRoot + 'app/sass/**/*.scss', ['build:sass']);
    gulp.watch('./build/vendors.js', ['build:vendors']);
});

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
    .pipe(gulp.dest('./dist'));
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
      .pipe(gulp.dest('./dist'));
});

gulp.task('build:app', function() {
  var b = browserify({
            insertGlobals: false,
            detectGlobals: false,
            debug: true
          })

  _.forEach(vendors, function(vendor) {
    b.external(vendor.file)
  })
  
  b.add(appRoot + 'app/index.js');

  return b
        .transform(babelify.configure({
          stage: 0
        }))
        .transform(envify({
          _: 'purge',
          NODE_ENV: process.env.NODE_ENV,
          API_URL: (process.env.NODE_ENV === 'production') ? 'http://brianbland.me' : 'http://localhost:8080'
        }),{
          // Needed to apply for node_modules
          global: true
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))        
        .pipe(gulp.dest('./dist'));
});