import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import * as userPages from './containers';
import * as userComponents from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import {UsersEffects, usersReducer} from './store';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";

@NgModule({
    declarations: [
        ...userPages.pages,
        ...userComponents.pages
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
HttpClientModule,
        ReactiveFormsModule,
        UsersRoutingModule,

        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UsersEffects]),
    ],
    providers: [
        UserService
    ]
})
export class UsersModule {
}
