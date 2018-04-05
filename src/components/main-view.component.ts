import {Component, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../services/authorization.services';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'main-view',
  template:
    `<header-element *ngIf="!loading && authorized"></header-element>
     <loader-element *ngIf="loading"></loader-element>
     <router-outlet *ngIf="!loading"></router-outlet>`
})

export class MainViewComponent implements OnDestroy {

  authorized: boolean;
  subscription: Subscription;
  loading: boolean;

  tokenTimeout: TimerObservable;

  constructor(private _auth: AuthorizationServices) {
    this.loading = false;
    this.authorized = this._auth.fetchAuth();
    this.subscription = this._auth.subscribeAuth()
      .subscribe(() => {
        this.authorized = this._auth.fetchAuth();
      });
    this.tokenTimeout = new TimerObservable(2000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
