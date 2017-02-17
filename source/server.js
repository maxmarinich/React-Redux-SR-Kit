import path from 'path';
import React from 'react';
import Express from 'express';
import log from './assets/js/log';
import { Provider } from 'react-redux';
import routes from './assets/js/routes';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import configureStore from './assets/js/configureStore';
import { titleAction } from './assets/js/structure/store/store';


const app = new Express();
const store = configureStore();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(Express.static(path.join(__dirname, '../static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.massage)
    }
    else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    }
    else if (props) {
      store.dispatch(titleAction('Title for the Main page.'));

      const preloadedState = store.getState();
      const appHtml = renderToString(<Provider store={ store }><RouterContext { ...props } /></Provider>);
      res.render('index', { html: appHtml, state: preloadedState })
    } else {
      res.status(404).send('Not found')
    }
  });
});

app.listen( port, (error) => {
  if (error) {
    log.error(error)
  } else {
    log.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
