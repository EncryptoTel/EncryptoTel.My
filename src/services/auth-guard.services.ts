import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthorizationServices} from './authorization.services';

@Injectable()
export class AuthGuardServices implements CanActivate {
  constructor(private _services: AuthorizationServices,
              private router: Router) {}
  canActivate() {
    if (this._services.fetchAuth()) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
