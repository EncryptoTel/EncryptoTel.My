import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../services/authorization.services';
import {PopupServices} from '../services/popup.services';
import {FadeAnimation} from '../shared/functions';
import {DialogServices} from '../services/dialog.services';
import {NavigationEnd, Router} from '@angular/router';
import {AnalyticsServices} from '../services/analytics.services';


@Component({
  selector: 'main-view',
  template:
      `
    <header-element *ngIf="!loading && isAuthorized()"></header-element>
    <loader-element *ngIf="loading"></loader-element>
    <router-outlet *ngIf="!loading"></router-outlet>
    <popup-element *ngIf="popup.visible" [@Fade]></popup-element>
    <dialog-element *ngIf="dialog.visible" [@Fade]></dialog-element>`,
  animations: [FadeAnimation('150ms')],
  providers: [AnalyticsServices]
})

export class MainViewComponent implements OnInit, OnDestroy {

  authorized: boolean;
  subscription: Subscription;
  loading: boolean;
  logout: boolean;

  constructor(private _auth: AuthorizationServices,
              public popup: PopupServices,
              public dialog: DialogServices,
              private router: Router,
              private analytics: AnalyticsServices) {
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

  includesCheck = (url: string): boolean => {
    return url.includes('password-recovery') ||
      url.includes('change-email') ||
      url.includes('sign-up') ||
      url.includes('email-confirmation');
  };

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (this.includesCheck(e.urlAfterRedirects)) {
          this.analytics.sendPageView('/' + e.urlAfterRedirects.split('/')[1]);
        } else if (e.urlAfterRedirects.includes('sign-in')) {
          return;
        } else if (/[0-9]/gi.test(e.urlAfterRedirects)) {
          const temp = e.urlAfterRedirects.split('/').filter(i => !/[0-9]/gi.test(i)).join('/');
          this.analytics.sendPageView(temp);
        } else {
          this.analytics.sendPageView(e.urlAfterRedirects);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
