import { combineReducers } from 'redux';
import appReducer from './appReducer';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  appReducer,
  authReducer,
  chatReducer,
  userReducer
});

export default rootReducer;
