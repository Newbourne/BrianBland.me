var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./build/tasks');

gulp.task('default', ['hydrate-config', 'build:app', 'build:vendors', 'build:sass'], function() {
})