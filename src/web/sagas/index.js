/**
 * Created by Leon_Hsieh on 2017/5/20.
 */
import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticateSaga';
import errorSaga from './errorSaga';

export default function* root() {
  yield all([
    authenticateSaga,
    errorSaga
  ]);
}
