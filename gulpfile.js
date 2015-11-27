'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var del = require('del');
var generateCss = require('generate-github-markdown-css');
var cleanup = require('./tasks/cleanup');

gulp.task('generate-css', function (done) {
  generateCss(function (err, css) {
    if (err) {
      done(err);
      return;
    }
    require('fs').writeFileSync('src/github-markdown.css', css);
    done();
  });
});

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

gulp.task('build', function (done) {
  runSequence('generate-css', ['build-fixed-css', 'build-fluid-css'], done);
});

gulp.task('clean', del.bind(null, ['dist']));

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

gulp.task('clean-pages', del.bind(null, ['gh-pages']));

gulp.task('deploy', function () {
  return gulp.src('gh-pages/**/*')
    .pipe($.ghPages());
});

gulp.task('pages', ['clean-pages'], function (done) {
  runSequence('build-pages', 'deploy', done);
});

gulp.task('default', ['clean'], function (done) {
  runSequence('build', done);
});
