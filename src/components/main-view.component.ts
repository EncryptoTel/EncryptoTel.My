import {Component, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../services/authorization.services';

@Component({
  selector: 'main-view',
  template: '<header-element *ngIf="authorized"></header-element><router-outlet></router-outlet>'
})

export class MainViewComponent implements OnDestroy {

  authorized: boolean;
  subscription: Subscription;

  constructor(public _auth: AuthorizationServices) {
    this.authorized = this._auth.fetchAuth();
    this.subscription = this._auth.subscribeAuth()
      .subscribe(() => {
        this.authorized = this._auth.fetchAuth();
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
