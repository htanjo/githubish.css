'use strict';

var fs = require('fs');
var gulp = require('gulp');
var githubMd = require('./');

gulp.task('default', function () {
  githubMd(function (err, css) {
    if (err) {
      throw err;
    }
    fs.writeFileSync('github-md.css', css);
  });
});
