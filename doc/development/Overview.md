# TNT.js Core Development

## Setting up the development environment

Install dependencies:

```bash
$ npm i
```

Then install [rollup.js](https://rollupjs.org/guide/en/):

```bash
$ npm i -g rollup
```

And install [live-server](https://github.com/tapio/live-server) to have a better DX:

```bash
$ npm i -g live-server
```

## Running the application

We need to serve ES Modules through HTTP/HTTPS so we can use them in the browser.

To do so, fire up live-server:

```bash
$ live-server
```

This will serve everything in the root folder at [localhost](http://127.0.0.1:8080).

Additionally, contents in `index.html` can be found directly at [/](http://127.0.0.1:8080/). But `/index.html` works too!

To start a live reload bundler, use `rollup -c -w`. This will watch for changes in the current folder and compile them!
