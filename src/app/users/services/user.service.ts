import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) {

  }
  getUsersList(): Observable<User[]> {
    return this.http
      .get<User[]>(`/api/users`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`/api/users/${id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addNewUser(userData: User): Observable<User> {
    return this.http
      .post<User>(`/api/users`, userData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateUser(userData: User): Observable<User>  {
    return this.http
      .put<User>(`/api/users/${userData.id}`, userData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  // deleteUser(id: number): Observable<any>  {
  //   return this.http
  //       .delete<User>(`/api/users/${id}`)
  //       .pipe(catchError((error: any) => throwError(error.json())));
  // }
  deleteUser( userData: User): Observable<any>  {
    return this.http
        .delete<User>(`/api/users/${userData.id}`)
        .pipe(catchError((error: any) => throwError(error.json())));
  }

  searchUser(keyword: any): Observable<User[]> {
    return of(null);
  }
}
