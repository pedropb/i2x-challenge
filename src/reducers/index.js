import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import recordingsReducer from './recordingsReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  recordings: recordingsReducer
});

export default rootReducer;
