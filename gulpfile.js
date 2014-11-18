'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('event-stream').merge;
var del = require('del');
var cleanup = require('./tasks/cleanup');

gulp.task('build', function () {
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

gulp.task('build-pages', function () {
  return merge(
    gulp.src('README.md')
      .pipe($.markdown())
      .pipe($.wrap({src: 'templates/fixed.html'}))
      .pipe($.rename('index.html'))
      .pipe(gulp.dest('gh-pages')),

    gulp.src('README.md')
      .pipe($.markdown())
      .pipe($.wrap({src: 'templates/fluid.html'}))
      .pipe($.rename('fluid.html'))
      .pipe(gulp.dest('gh-pages')),

    gulp.src(['dist/githubish.css', 'dist/githubish-fluid.css'])
      .pipe(gulp.dest('gh-pages'))
  );
});

gulp.task('clean-pages', function (cb) {
  del(['gh-pages'], cb);
});

gulp.task('default', ['clean', 'build']);
gulp.task('pages', ['clean-pages', 'build-pages']);
