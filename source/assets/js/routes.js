import React from 'react';
import { App } from './structure/app';
import { About } from './structure/about';
import { Route } from 'react-router';
import notfound from './structure/notfound';


const routes = (
  <Route path="/" component={ App }>
    <Route path="/about" component={ About } />
    <Route path="*" component={ notfound } />
  </Route>
);

export default routes;
