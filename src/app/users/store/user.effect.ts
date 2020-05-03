import {Injectable} from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as userActions from './user.action';
import {catchError, exhaustMap, map, tap, timeInterval, timeout} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
  }

  loadProductsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsersList),
      exhaustMap(()  =>
        this.userService.getUsersList().pipe(
          map(res => userActions.loadUsersListSuccess({ users: res })),
          catchError(error => of(userActions.loadUsersListFailed({ errors: error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      exhaustMap(action  =>
        this.userService.getUserById(action.id).pipe(
          map(res => userActions.loadUsersuccess({ user: res })),
          catchError(error => of(userActions.loadUserFailed({ errors: error })))
        )
      )
    )
  );
  //
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser),
      exhaustMap(action =>
        this.userService.addNewUser(action.user).pipe(
          map(res => {
            return userActions.createUsersuccess({ user: res });
             }),
          catchError(error => of(userActions.createUserFailed({ errors: error })))
        )
      )
    )
  );
  //
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      exhaustMap(action =>
        this.userService.updateUser(action.user).pipe(
          map(res => {
            return userActions.updateUsersuccess({ user: res });
            // return productActions.loadProductsList();
          }),
          catchError(error => of(userActions.updateUserFailed({ errors: error })))
        )
      )
    )
  );
  //
  createProductS$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.createUsersuccess),
        tap((response) => {
            this.toastr.success('Tạo Thành Công');
            this.router.navigate(['/users']);
        })
      ),
    { dispatch: false }
  );

  updateProductS$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.updateUsersuccess),
        tap((response) => {
            this.toastr.success('Cập Nhật Thành Công');
            this.router.navigate(['/users']);
        })
      ),
    { dispatch: false }
  );

}
