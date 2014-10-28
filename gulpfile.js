'use strict';

var fs = require('fs');
var gulp = require('gulp');
var githubMd = require('./tasks/github-md');

gulp.task('default', function () {
  githubMd(function (err, css) {
    if (err) {
      throw err;
    }
    fs.writeFileSync('dist/github-md.css', css);
  });
});
