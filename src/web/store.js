import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';

import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(routerMiddleware(createHashHistory), sagaMiddleware),
  ),
);
delete window.__PRELOADED_STATE__;
store.runSaga = sagaMiddleware.run;

store.close = () => store.dispatch(END);
export const history = syncHistoryWithStore(createHashHistory(), store);
export default store;
