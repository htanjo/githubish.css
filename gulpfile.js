'use strict';

var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var got = require('got');
var cheerio = require('cheerio');
var uncss = require('uncss');
var cleanup = require('./tasks/cleanup');

var FIXTURE = 'https://github.com/htanjo/github-md.css/blob/master/src/fixture.md';

function getRenderedFixture(cb) {
  got(FIXTURE, function (err, data) {
    if (err) {
      cb(err);
      return;
    }
    var $ = cheerio.load(data);
    var body = $('.markdown-body');
    var html = $.html($('body').html(body).closest('html'));
    cb(null, html);
  });
}

gulp.task('build', function (cb) {

  getRenderedFixture(function (err, html) {
    if (err) {
      cb(err);
      return;
    }
    uncss(html, {}, function (err, css) {
      if (err) {
        cb(err);
        return;
      }
      fs.writeFileSync('src/github-md.css', css);

      gulp.src('src/*.css')
        .pipe(cleanup())
        .pipe(gulp.dest('dist'))
        .on('end', function () {
          cb();
        });

    });
  });

});

gulp.task('default', ['build']);
