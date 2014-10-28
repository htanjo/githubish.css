'use strict';

var got = require('got');
var cheerio = require('cheerio');
var uncss = require('uncss');

function getCss(cb) {
  got('https://github.com', function (err, data) {
    if (err) {
      cb(err);
      return;
    }

    var ret = [];
    var $ = cheerio.load(data);

    $('link[href*="assets/github"]').each(function (i, el) {
      ret.push(el.attribs.href);
    });

    if (ret.length === 0) {
      cb(new Error('Could not find GitHub stylesheets'));
      return;
    }

    cb(null, ret);
  });
}

function getRenderedFixture(cb) {
  var url = 'https://github.com/sindresorhus/github-markdown-css/blob/gh-pages/fixture.md';

  got(url, function (err, data) {
    if (err) {
      cb(err);
      return;
    }

    var $ = cheerio.load(data);
    var html = $('.markdown-body').parent().html();

    cb(null, html);
  });
}

function cleanupCss(str) {
  var css = require('css');
  var style = css.parse(str);
  var mdBodyProps = [];

  style.stylesheet.rules = style.stylesheet.rules.filter(function (el) {

    if (el.type === 'keyframes' || el.type === 'comment' || el.type === 'font-face') {
      return false;
    }

    if (el.type ==='rule') {

      // Remove unnecessary selectors
      if (/::-webkit-validation|:-moz-placeholder/.test(el.selectors[0])) {
        return false;
      }

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

        if (/\.markdown-body>.+/.test(selector)) {
          selector = selector.replace(/\.markdown-body/, 'body');
        }

        selector = selector.replace(/\.markdown-body /, '');

        return selector;
      });
    }

    if (el.declarations.length === 0) {
      return false;
    }

    return true;
  });

  return css.stringify(style);
}

module.exports = function (cb) {
  getRenderedFixture(function (err, html) {
    if (err) {
      cb(err);
      return;
    }

    getCss(function (err, stylesheets) {
      if (err) {
        cb(err);
        return;
      }

      uncss(html, {
        stylesheets: stylesheets,
        ignore: [/^\.highlight/]
      }, function (err, css) {
        if (err) {
          throw err;
        }

        cb(null, cleanupCss(css));
      });
    });
  });
};
