import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {RequestServices} from './request.services';
import {StorageServices} from './storage.services';

@Injectable()
export class AuthorizationServices {

  authSubscription: Subject<void>;
  formMessage: string;

  constructor(private _req: RequestServices,
              private _storage: StorageServices,
              private router: Router) {
    this.authSubscription = new Subject<void>();
  }

  // Method for check if user already logged in
  // TODO: Token expiration validation
  fetchAuth(): boolean {
    return !!this._storage.readItem('_auth_tk');
  }

  // Primary authorization method
  signIn(formData): Promise<void> {
    return this._req.post('auth/login', {...formData}, true)
      .then(res => {
        this._storage.writeItem('_auth_tk', res);
        this.authSubscription.next();
        return Promise.resolve(null);
      }).catch(res => {
        if (res.message) {
          this.setMessage(res.message);
        } else {
          this.setMessage('Unknown error');
        }
        this.authSubscription.next();
        return Promise.reject(null);
      })
  }

  // Invitation hash validation
  validateHash(hash: string): Promise<boolean> {
    return this._req.post('invite/check', {hash: hash}, true)
      .then(res => {
        return Promise.resolve(!!res.success);
      }).catch(res => {
        if (res.message) {
          this.setMessage(res.message);
        } else {
          this.setMessage('Unknown error');
        }
        return Promise.resolve(false);
      })
  }

  // Wallet validation
  validateWallet(wallet: string): Promise<void> {
    return this._req.getWaves(`addresses/balance/${wallet}`, true)
      .then().catch()
  }

  // Primary registration method
  signUp(formData): Promise<void> {
    return this._req.post('invite/save', {...formData}, true)
      .then(res => {
        this._storage.writeItem('_auth_tk', res);
        this.authSubscription.next();
        return;
      })
      .catch(res => {
        if (res.message) {
          this.setMessage(res.message);
        } else {
          this.setMessage('Unknown error')
        }
        return;
      })
  }

  logout(): void {
    localStorage.removeItem('_auth_tk');
    this.router.navigateByUrl('').then(() => this.authSubscription.next());
  }

  // Services message setter
  setMessage(message: string): void {
    this.formMessage = message;
    this.authSubscription.next();
  }

  // Services message clearing
  clearMessage(): void {
    if (this.formMessage) {
      this.formMessage = undefined;
      this.authSubscription.next();
    }
  }

  // Service update subscription. Fires on any changes.
  subscribeAuth(): Observable<void> {
    return this.authSubscription.asObservable();
  }
}
