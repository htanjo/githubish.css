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
  790px centered layout with borders. Similar to README document in GitHub.

* **[githubish-fluid.css](https://raw.githubusercontent.com/htanjo/githubish.css/master/dist/githubish-fluid.css)** / [minified](https://raw.githubusercontent.com/htanjo/githubish.css/master/dist/githubish-fluid.min.css)  
  100% fluid width. This is suitable for generic document.

Or install via [Bower](http://bower.io/).

```shell
$ bower install --save githubish
```

## Usage
Just import "githubish.css" to your HTML.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="githubish.css">
  </head>
  <body>
    Write document here.
  </body>
</html>
```

## License
Copyright (c) 2014-2015 Hiroyuki Tanjo. Licensed under the [MIT License](https://github.com/htanjo/githubish.css/blob/master/LICENSE).
