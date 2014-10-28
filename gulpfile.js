'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var cleanup = require('./tasks/cleanup');

gulp.task('build', function (cb) {
  return gulp.src('bower_components/github-markdown-css/github-markdown.css')
    .pipe(cleanup())
    .pipe($.rename('githubish.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('default', ['clean', 'build']);
