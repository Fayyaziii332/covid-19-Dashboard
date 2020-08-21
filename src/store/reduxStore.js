import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/mainReducer';


const middlewares = [thunk]
const store = createStore(mainReducer, applyMiddleware(...middlewares));

export default store;