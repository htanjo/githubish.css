'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var del = require('del');
var generateCss = require('generate-github-markdown-css');
var cleanup = require('./tasks/cleanup');

// Generate the base github-markdown.css
gulp.task('generate-css', function () {
  return generateCss()
    .then(function (css) {
      require('fs').writeFileSync('src/github-markdown.css', css);
    });
});

// Build githubish(.min).css
gulp.task('build-fixed-css', function () {
  return gulp.src(['src/github-markdown.css', 'src/fixed.css'])
    .pipe($.concat('githubish.min.css'))
    .pipe(cleanup())
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist'))
    .pipe($.cssbeautify())
    .pipe($.csscomb())
    .pipe($.rename('githubish.css'))
    .pipe(gulp.dest('dist'));
});

// Build githubish-fluid(.min).css
gulp.task('build-fluid-css', function () {
  return gulp.src(['src/github-markdown.css', 'src/fluid.css'])
    .pipe($.concat('githubish-fluid.min.css'))
    .pipe(cleanup())
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist'))
    .pipe($.cssbeautify())
    .pipe($.csscomb())
    .pipe($.rename('githubish-fluid.css'))
    .pipe(gulp.dest('dist'));
});

// Main build task
gulp.task('build', function (done) {
  runSequence('generate-css', ['build-fixed-css', 'build-fluid-css'], done);
});

// Cleanup for build task
gulp.task('clean', del.bind(null, ['dist']));

// Build HTML for githubish.css
gulp.task('build-fixed-html', function () {
  return gulp.src('README.md')
    .pipe($.markdown())
    .pipe($.wrap({src: 'templates/fixed.html'}))
    .pipe($.rename('index.html'))
    .pipe(gulp.dest('gh-pages'));
});

// Build HTML for githubish-fluid.css
gulp.task('build-fluid-html', function () {
  return gulp.src('README.md')
    .pipe($.markdown())
    .pipe($.wrap({src: 'templates/fluid.html'}))
    .pipe($.rename('fluid.html'))
    .pipe(gulp.dest('gh-pages'));
});

// Build demo pages
gulp.task('build-pages', ['build-fixed-html', 'build-fluid-html'], function () {
  return gulp.src(['dist/githubish.css', 'dist/githubish-fluid.css'])
    .pipe(gulp.dest('gh-pages'));
});

// Cleanup for demo pages
gulp.task('clean-pages', del.bind(null, ['gh-pages']));

// Deploy to gh-pages
gulp.task('deploy', function () {
  return gulp.src('gh-pages/**/*')
    .pipe($.ghPages());
});

// Create demo and deploy
gulp.task('pages', ['clean-pages'], function (done) {
  runSequence('build-pages', 'deploy', done);
});

// Build this library
gulp.task('default', ['clean'], function (done) {
  runSequence('build', done);
});
