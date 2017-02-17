import React from 'react';
import { Link } from 'react-router';


export const Header = () => (
  <header className="s-header ">
    <div className="container">
      <Link to="/" className="s-header__logo">LOGO</Link>
      <nav className="s-header__nav" role="navigation">
        <Link to="/about" className="s-header__nav-item">about</Link>
      </nav>
    </div>
  </header>
);
