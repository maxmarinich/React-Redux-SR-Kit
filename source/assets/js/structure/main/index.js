import React from 'react';
import { connect } from 'react-redux';


const Main = ({ title }) => (
  <main className="s-main">
    <div className="container"><h1>{ title }</h1></div>
  </main>
);

export default connect(store => ({
  title: store.createTitleReducer.title
}))(Main);
