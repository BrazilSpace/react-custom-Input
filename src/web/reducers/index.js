import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import error from './errorReducer';

const reducer = combineReducers({
  routing: routerReducer,
  error,
});

export default reducer;
