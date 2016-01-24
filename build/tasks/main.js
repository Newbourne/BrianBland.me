'use strict';
var path       = require('path');
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
var cssNano    = require('gulp-cssnano');
var babel      = require("gulp-babel");
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil      = require('gulp-util');

var vendors    = require('./../vendors');
var appRoot    = path.normalize(__dirname + './../../src/')

gulp.task('config:dev', function() {
    var variables = require('./../../app-secrets-dev.json');
    
    process.env.NODE_ENV = variables.env
    process.env.API_HOST = variables.client.api.host
    process.env.API_PORT = variables.client.api.port
    
    return
})

gulp.task('config:prod', function() {
    var variables = require('./../../app-secrets-prod.json');
    
    process.env.NODE_ENV = variables.env
    process.env.API_HOST = variables.client.api.host
    process.env.API_PORT = variables.client.api.port
    
    return
})

gulp.task('build:vendors', function() {
  var b = browserify({ })

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
  bs.init({
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
    script: appRoot + 'server/index.js',
    stdin: true,
    restartable: true,
    exec: 'babel-node',
    ignore: ["node_modules/**", "dist/**", "build/**"]
  }).on('start', function() {
      if (!started){
        started = true;
      }
    })
})

gulp.task('build:server', function() {
    // Doesn't work, gulp-babel broken
    // return 
    //     gulp.src(appRoot + 'server/index.js')
    //     .pipe(babel({
    //         presets: ['es2015', 'react'] //'runtime'
    //     }))
    //     .pipe(gulp.dest('./lib'));
})

gulp.task('build:app', function() {
  var b = browserify({
            insertGlobals: false,
            detectGlobals: true,
            debug: false,
            extensions: ['.js', '.json', '.jsx']
          })

  _.forEach(vendors, function(vendor) {
    b.external(vendor.file)
  })
  
  b.add(appRoot + 'app/index.jsx');

  return b
        .transform(babelify.configure({
          presets: ["es2015", "react"]
        }))
        .transform(envify({
          _: 'purge',
          //NODE_ENV: process.env.NODE_ENV,
          API_HOST: process.env.API_HOST,
          API_PORT: process.env.API_PORT,
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