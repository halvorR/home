import { compose, createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import reducers from './reducers'


// Middleware
const middleware = applyMiddleware(thunk);
const enableReduxDevtools = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
const composeEnhancers = enableReduxDevtools && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(middleware);
const store = createStore(reducers, enhancer);


// Enable Webpack hot module replacement for reducers
if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
