var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./build/tasks');

gulp.task('default', ['build:app', 'build:vendors', 'build:sass'], function() {
})

gulp.task('build:prod', ['build:app', 'build:vendors', 'build:sass'], function() {
})

gulp.task('build:dev', ['build:app', 'build:vendors', 'build:sass'], function() {
})