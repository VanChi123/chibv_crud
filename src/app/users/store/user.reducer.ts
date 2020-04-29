import { Action, createReducer, on } from '@ngrx/store';

import {User} from '../models/user.model';
import * as userActions from './user.action';
export interface UserState {
  users: User[];
  user: User;
  errors: any;
}

export const initialState: UserState = {
  users: [],
  user: null,
  errors: null
};

const userReducer = createReducer(
  initialState,

  /***************** Load products ****************/
  on(userActions.loadUsersList, state => ({
    ...state,
    users: [],
    errors: null
  })),

  on(userActions.loadUsersListSuccess, (state, { users}) => ({
    ...state,
    users,
    errors: null
  })),

  on(userActions.loadUsersListFailed, (state, { errors}) => ({
    ...state,
    errors
  })),
    on(userActions.createUser, state => ({
      ...state,
      errors: null
    })),

    on(userActions.createUsersuccess, (state, { user}) => ({
      ...state,
      users: [...state.users, user],
      errors: null
    })),

    on(userActions.createUserFailed, (state, { errors}) => ({
      ...state,
      errors
    })),
    // /***************** Load product ****************/
    on(userActions.loadUser, state => ({
      ...state,
      product: null,
      errors: null
    })),

    on(userActions.loadUsersuccess, (state, { user}) => ({
      ...state,
      user,
      errors: null
    })),

    on(userActions.loadUserFailed, (state, { errors}) => ({
      ...state,
      errors
    })),

    /***************** Update product ****************/
  on(userActions.updateUser, state => ({
    ...state,
    errors: null
  })),

  on(userActions.updateUsersuccess, (state, { user}) => ({
    ...state,
    // products: Object.assign(
    //   [],
    //   state.products.splice(_.findIndex(state.products, {id: product.id}), 1, product)),
    errors: null
  })),

  on(userActions.updateUserFailed, (state, { errors}) => ({
    ...state,
    errors
  }))
);
export function usersReducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

