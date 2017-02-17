import React from 'react';
import Main from './main';
import { Header } from './header';


export const App = (props) => (
  <div className="root-content">
    <Header />
    <div className="s-wrapper">{ props.children || <Main /> }</div>
    <footer className="s-footer" />
  </div>
);
