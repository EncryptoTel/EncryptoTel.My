import {Component, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../services/authorization.services';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {PopupServices} from '../services/popup.services';
import {FadeAnimation} from '../shared/functions';

@Component({
  selector: 'main-view',
  template:
    `<header-element *ngIf="!loading && authorized"></header-element>
     <loader-element *ngIf="loading"></loader-element>
     <router-outlet *ngIf="!loading"></router-outlet>
     <popup-element *ngIf="popup.visible" [@Fade]></popup-element>`,
  animations: [FadeAnimation('150ms')]
})

export class MainViewComponent implements OnDestroy {

  authorized: boolean;
  subscription: Subscription;
  loading: boolean;

  tokenTimeout: TimerObservable;

  constructor(private _auth: AuthorizationServices,
              public popup: PopupServices) {
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
