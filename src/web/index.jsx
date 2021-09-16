import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store, { history } from './store';
// import rootSaga from './sagas';
import routes from './routes';
import Main from './containers/MainContainer';

// store.runSaga(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
);
