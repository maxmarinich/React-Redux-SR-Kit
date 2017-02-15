import path from 'path';
import Express from 'express';
import log from './assets/js/log';
import cookieParser from 'cookie-parser';


const app = new Express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(Express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.get('*', (req, res) => {
  res.render('index', { html: 'root', state: 'state' })
});

app.listen( port, (error) => {
  if (error) {
    log.error(error)
  } else {
    log.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
