import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {loadUsersList, selectUsersList, UserState} from '../../store';

@Component({
  selector: 'fis-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  title = 'User List';

  constructor(private userStore: Store<UserState>) {}

  listUser$: Observable<User[]>;

  ngOnInit(): void {
     this.userStore.dispatch(loadUsersList());
     this.listUser$ = this.userStore.pipe(select(selectUsersList));
  }
    // hamf nhaan su kien cua ben search
    onSeach(keyword: any) {
         console.log('key word seach', keyword);
        // if(keyword && keyword.length>0){
        //   this.productsList$ = this.productService.searchProduct(keyword);
        // }else {
        //   this.onGetProductList()
  }


    }
