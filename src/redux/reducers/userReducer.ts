import { createReducer } from '@reduxjs/toolkit';
import { storeUser } from '../actionCreator/userActionCreator';

export const userReducer = createReducer({}, (builder) => {
  builder.addCase(storeUser.toString(), (state, action) => {
    return action;
  });
});
