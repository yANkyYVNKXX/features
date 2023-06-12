const React = require('react');
const ReactDomServer = require('react-dom/server')
const express = require('express')
const browserify = require('browserify')
const babelify = require('babelify')

const app = express();
const port = 3000;

app.get('/bundle.js', (req, res) => {
    browserify('./client.js', { debug: true }).transform(babelify).bundle().pipe(res);
});

app.get('/', (req, res) => {

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div id="app">qwe</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});