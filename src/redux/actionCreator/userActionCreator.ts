import { createAction } from '@reduxjs/toolkit';
import { ActionCreators } from '../../helpers/enums';
import { IUserProfile } from '../../interfaces/UserProfile';

let storeUser = createAction(ActionCreators.StoreUser, (user: IUserProfile) => {
  return { payload: user };
});

export { storeUser };
