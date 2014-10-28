'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('event-stream').merge;
var del = require('del');
var cleanup = require('./tasks/cleanup');

gulp.task('build', function (cb) {
  return merge(
    gulp.src(['bower_components/github-markdown-css/github-markdown.css', 'src/fixed.css'])
      .pipe($.concat('githubish.min.css'))
      .pipe(cleanup())
      .pipe($.minifyCss())
      .pipe(gulp.dest('dist'))
      .pipe($.cssbeautify())
      .pipe($.csscomb())
      .pipe($.rename('githubish.css'))
      .pipe(gulp.dest('dist')),

    gulp.src(['bower_components/github-markdown-css/github-markdown.css', 'src/fluid.css'])
      .pipe($.concat('githubish-fluid.min.css'))
      .pipe(cleanup())
      .pipe($.minifyCss())
      .pipe(gulp.dest('dist'))
      .pipe($.cssbeautify())
      .pipe($.csscomb())
      .pipe($.rename('githubish-fluid.css'))
      .pipe(gulp.dest('dist'))
  );
});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('default', ['clean', 'build']);
