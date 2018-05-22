import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../services/authorization.services';
import {PopupServices} from '../services/popup.services';
import {FadeAnimation} from '../shared/functions';
import {DialogServices} from '../services/dialog.services';


@Component({
  selector: 'main-view',
  template:
      `
    <header-element *ngIf="!loading && isAuthorized()"></header-element>
    <loader-element *ngIf="loading"></loader-element>
    <router-outlet *ngIf="!loading"></router-outlet>
    <popup-element *ngIf="popup.visible" [@Fade]></popup-element>
    <dialog-element *ngIf="dialog.visible" [@Fade]></dialog-element>`,
  animations: [FadeAnimation('150ms')]
})

export class MainViewComponent implements OnInit, OnDestroy {

  authorized: boolean;
  subscription: Subscription;
  loading: boolean;
  logout: boolean;

  constructor(private _auth: AuthorizationServices,
              public popup: PopupServices,
              public dialog: DialogServices) {
    this.loading = false;
    this.logout = false;
    this.authorized = this._auth.fetchAuth();
    this.subscription = this._auth.subscribeAuth()
      .subscribe(() => {
        this.authorized = this._auth.fetchAuth();
        if (this.authorized) {
          this.logout = false;
          // this._auth.setTokenTimer();
        } else {
          // this._auth.hideDialog();
        }
      });
  }

  isAuthorized() {
    // const auth = this._auth.fetchAuth();
    // if (!auth && !this.logout) {
    //   this.logout = true;
    //   this._auth.logout();
    // }
    // return auth;
      return this.authorized;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
