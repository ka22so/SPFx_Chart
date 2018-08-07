import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import SPFxReducer from '../state/SPFxReducer';
import { State } from '../state/SPFxState';

const loggerMiddleware = createLogger();

export default function configureStore() {

  //do not use loggerMiddleware in production
  const SateStore: Store<State> = createStore<State>(SPFxReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

  return SateStore;
}
