import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


const middleware = composeWithDevTools(compose(applyMiddleware(thunk)));
const store = createStore(rootReducer, middleware);

export default store;
