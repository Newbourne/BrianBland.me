'use strict';
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
var minifyCSS  = require('gulp-minify-css');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var commandLineArgs = require('command-line-args');

var vendors    = require('./../vendors');

var appRoot = './src/'

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

gulp.task('build:sync', function() {
  bs({
      proxy: "localhost:8080",
      open: true
  });

  gulp.watch(appRoot + 'app/**/*.js', ['build:app'], bs.reload);
  gulp.watch(appRoot + 'app/sass/**/*.scss', ['build:sass'], bs.reload);
  gulp.watch('./build/vendors.js', ['build:vendors'], bs.reload);

  var started = false;
  nodemon({
    script: appRoot + 'index.js',
    stdin: false,
    restartable: false,
    exec: 'babel-node --stage 0',
    ignore: ["node_modules/**",  appRoot + "app/**", "dist/**", "build/**"]
  }).on('start', function() {
      if (!started){
        started = true;
        cb();
      }
    })
})

gulp.task('build:app', function() {
  var cli = commandLineArgs([
    { name: 'production', alias: 'p', type: Boolean }
  ])

  var options = cli.parse()

  if (!options.production) {
      process.env.NODE_ENV = 'development'
      process.env.API_URL = 'http://localhost:8080'
  }
  else {
      process.env.NODE_ENV = 'production'
      process.env.API_URL = 'http://brianbland.me'
  }

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
          API_URL: process.env.API_URL
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
        .pipe(gulp.dest('./dist'))
        .pipe(bs.stream());
});