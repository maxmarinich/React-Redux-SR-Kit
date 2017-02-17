import thunk from 'redux-thunk';
import { createTitleReducer } from './structure/store/store';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';


const configureStore = (state) => (
  createStore(
    combineReducers({ createTitleReducer }), state,
    composeWithDevTools(applyMiddleware(thunk))
  )
);

export default  configureStore;
