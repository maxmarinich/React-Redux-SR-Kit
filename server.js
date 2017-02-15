import path from 'path';
import Express from 'express';
import log from './assets/js/log';
import cookieParser from 'cookie-parser';


const app = new Express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
  res.send(renderPage());
});

app.listen( port, (error) => {
  if (error) {
    log.error(error)
  } else {
    log.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});

function renderPage(html, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React Kit</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width initial-scale=1">
        <link rel="shortcut icon" href="/i/favicon.ico" type="image/x-icon">
        <link type="text/css"  rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
        <link rel="stylesheet" type="text/css" href="/style.css">
      </head>
      <body>
        <div id="root">${html || 'root'}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(state || 'state')}
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
    `
}
