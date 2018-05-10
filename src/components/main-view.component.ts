import {Component, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../services/authorization.services';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {PopupServices} from '../services/popup.services';
import {FadeAnimation} from '../shared/functions';
import {DialogServices} from '../services/dialog.services';
import {StorageServices} from '../services/storage.services';

@Component({
  selector: 'main-view',
  template:
      `
    <header-element *ngIf="!loading && authorized"></header-element>
    <loader-element *ngIf="loading"></loader-element>
    <router-outlet *ngIf="!loading"></router-outlet>
    <popup-element *ngIf="popup.visible" [@Fade]></popup-element>
    <dialog-element *ngIf="dialog.visible" [@Fade]></dialog-element>`,
  animations: [FadeAnimation('150ms')]
})

export class MainViewComponent implements OnDestroy {

  authorized: boolean;
  subscription: Subscription;
  loading: boolean;
  timer;

  constructor(private _auth: AuthorizationServices,
              public popup: PopupServices,
              public dialog: DialogServices,
              private  storage: StorageServices) {
    this.loading = false;
    this.authorized = this._auth.fetchAuth();
    this.subscription = this._auth.subscribeAuth()
      .subscribe(() => {
        this.authorized = this._auth.fetchAuth();
        if (this.authorized) {
          this.setTokenTimer();
        } else {
          this.hideDialog();
        }
      });
  }

  setTokenTimer() {
    const ttl = this.storage.readItem('_auth_tk').token_ttl + Date.now();
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      if ((ttl - currentTime) <= 60000) {
        if ((ttl - currentTime) <= 0) {
          this.hideDialog();
        } else {
          this.showDialog(ttl, currentTime);
        }
      }
    }, 1000);
  }

  private hideDialog(): void {
    clearInterval(this.timer);
    this.dialog.visible = false;
    this.dialog.time = null;
  }

  private showDialog(ttl: number, currentTime: number): void {
    this.dialog.visible = true;
    this.dialog.time = Math.round(((ttl - currentTime) / 1000));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
