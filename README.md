# githubish.css

> Tiny CSS for GitHub-ish Markdown styles.

## Demo
* [Fixed layout](http://htanjo.github.io/githubish.css/)
* [Fluid layout](http://htanjo.github.io/githubish.css/fluid.html)

## Overview
This CSS arranges plain HTML as GitHub style Markdown document.  
githubish.css is based on [github-markdown-css](https://github.com/sindresorhus/github-markdown-css), but designed for non-classed HTML.

**github-markdown-css:**
* Needs wrapper element with `.markdown-body` class.
* Supports every style including GitHub doc extensions: e.g. anchor, syntax highlighting, ...

**githubish.css:**
* Works on plain HTML without any classes.
* Only contains styles for pure HTML elements generated from Markdown.

Both libraries are generated automatically using the production code of GitHub.

## Downloads
* **[githubish.css](https://raw.githubusercontent.com/htanjo/githubish.css/master/dist/githubish.css)** / [minified](https://raw.githubusercontent.com/htanjo/githubish.css/master/dist/githubish.min.css)  
  980px centered layout with borders. Similar to README document in GitHub.

* **[githubish-fluid.css](https://raw.githubusercontent.com/htanjo/githubish.css/master/dist/githubish-fluid.css)** / [minified](https://raw.githubusercontent.com/htanjo/githubish.css/master/dist/githubish-fluid.min.css)  
  100% fluid width. This is suitable for generic document.

Or install with package manager: [npm](https://www.npmjs.com/), [Bower](http://bower.io/)

```sh
$ npm install --save githubish
```

```sh
$ bower install --save githubish
```

## Usage
Just import "githubish.css" to your HTML.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Document</title>
    <link rel="stylesheet" href="githubish.css">
  </head>
  <body>
    <h1>Github-ish Markdown</h1>
    <p>Write your document here!</p>
  </body>
</html>
```

## License
Copyright (c) 2014-2015 Hiroyuki Tanjo. Licensed under the [MIT License](https://github.com/htanjo/githubish.css/blob/master/LICENSE).
