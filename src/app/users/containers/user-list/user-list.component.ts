import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {combineLatest, Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {loadUsersList, selectUsersList, UserState} from '../../store';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'fis-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  title = 'User List';

  constructor(private userStore: Store<UserState>,
              private route: ActivatedRoute,
              private userService: UserService
  ) {}

  listUser$: Observable<User[]>;
  user$: User;
  ngOnInit(): void {
      this.userStore.dispatch(loadUsersList());
      this.listUser$ = this.userStore.pipe(select(selectUsersList));
  }

    // hamf nhaan su kien cua ben search
    onSeach(keyword: any) {
      console.log('key word seach', keyword);
      // this.listUser$ = this.listUser$.pipe(
      //       filter(data => data.),
      //       map(res => res.split(","))
      //   );
      //    of(this.listUser$.filers)
         // filter(proj => proj.name == keyword);
        // if(keyword && keyword.length>0){
        //   this.productsList$ = this.productService.searchProduct(keyword);
        // }else {
        //   this.onGetProductList()
  }
}
