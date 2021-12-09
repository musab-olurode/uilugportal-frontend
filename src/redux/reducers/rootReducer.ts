import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';

let rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
