# githubish.css

> Tiny CSS for GitHub-ish Markdown styles.

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
* **[githubish.css](dist/githubish.css)** / [minified](dist/githubish.min.css)  
  790px centered layout with borders. Same as README document in GitHub.

* **[githubish-fluid.css](dist/githubish-fluid.css)** / [minified](dist/githubish-fluid.min.css)  
  100% fluid width. This is suitable for generic document.

## Usage
Just inport "githubish.css" to your HTML.

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
Copyright (c) 2014 Tanjo, Hiroyuki. Licensed under the [MIT License](LICENSE).
