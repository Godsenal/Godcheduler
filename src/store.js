
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

export const store = createStore(reducer);