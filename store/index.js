import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [
  thunkMiddleware
];

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares
)(createStore);

export const initStore = (initialState) => {
  return createStoreWithMiddleware(rootReducer, initialState);
}