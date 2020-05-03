import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {environment} from "../environments/environment";
import {MetaReducer, StoreModule} from "@ngrx/store";
import {storeFreeze} from "ngrx-store-freeze";
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {rootReducers} from "./root/root.reducer";
import {rootEffects} from "./root/root.effect";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    StoreModule.forRoot(rootReducers, { metaReducers }),
    EffectsModule.forRoot(rootEffects),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument(),


    // thu vien cua toast
    BrowserAnimationsModule,   // cais nayf la de chuyen trang
    ToastrModule.forRoot()    // phai import vao app.module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
