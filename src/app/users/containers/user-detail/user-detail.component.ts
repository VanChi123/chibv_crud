import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {select, Store} from "@ngrx/store";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {createUser, createUserFailed, loadUser, loadUsersuccess, selectUser, updateUser, UserState} from "../../store";
import {selectProductErrors} from "../../../products/store";

@Component({
  selector: 'fis-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  private unsubcribe$ = new Subject<void>();
  errors$: Observable<any>;
  user$: Observable<User>;

  checkExist: boolean;
  get name(): any{
    return this.userForm.get('name');
  }
  get price(): any{
    return this.userForm.get('price');
  }
  get quantity(): any{
    return this.userForm.get('quantity');
  }
  get nameControlInvalid() {
    return this.name.hasError('required') && this.name.touched;
  }
  get nameControlInvalid1() {
    return this.name.hasError('required') && this.name.touched;
  }
  userForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)])
  });
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userStore: Store<UserState>
  ) {}
  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('userId');
    console.log('user id = ', id);
    if (id) {
      this.checkExist = true;
      this.userStore.dispatch(loadUser({id: id}));
      this.user$ = this.userStore.pipe(select(selectUser));

      this.user$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if (res) {
          this.userForm.patchValue(res);
        }
      });

    } else {
      this.checkExist = false;
    }
  }

  onSave(form: FormGroup) {
    if (this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);
    }
  }

  onCreate(form: FormGroup) {
    const { value } = form;
    console.log(value);
    this.userStore.dispatch(createUser({user: value}));
    this.errors$ = this.userStore.pipe(select(createUserFailed));
  }

  onUpdate(form: FormGroup) {
    const { value } = form;
    this.userStore.dispatch(updateUser({user: value}));
  }

}
