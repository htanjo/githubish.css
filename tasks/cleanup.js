'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var css = require('css');

module.exports = function () {

  var stream = through.obj(function(file, enc, cb) {

    if (file.isNull()) {
       cb(null, file);
       return;
    }
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-cleanup', 'Streaming not supported'));
      return;
    }

    if (file.isBuffer()) {

      var str = String(file.contents);
      var style = css.parse(str);

      style.stylesheet.rules = style.stylesheet.rules.filter(function (el) {

        if (el.type === 'font-face') {
          return false;
        }

        if (el.type ==='rule') {

          // Remove class selectors
          el.selectors = el.selectors.filter(function (selector) {
            return !/\.(?!markdown-body)/.test(selector);
          });
          if (el.selectors.length === 0) {
            return false;
          }

          // Strip `.markdown-body` or replace with `body`
          el.selectors = el.selectors.map(function (selector) {
            if (/^\.markdown-body$/.test(selector)) {
              selector = 'body';
            }

            if (/\.markdown-body[>:].+/.test(selector)) {
              selector = selector.replace(/\.markdown-body/, 'body');
            }

            selector = selector.replace(/\.markdown-body /, '');

            return selector;
          });
        }

        return true;
      });

      file.contents = new Buffer(css.stringify(style));

    }

    cb(null, file);

  });

  return stream;

};
