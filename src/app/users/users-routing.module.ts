import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDetailComponent, UserListComponent} from './containers';

const routes: Routes = [
  {
    path: 'users-list',
    component: UserListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users-list'
  },
  {
    path: 'create',
    component: UserDetailComponent
  },
  {
    path: ':userId',
    component: UserDetailComponent
  },
  {
    path: 'delete/:id',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
