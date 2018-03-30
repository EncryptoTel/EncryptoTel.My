import {Injectable} from '@angular/core';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {RequestServices} from './request.services';
import {StorageServices} from './storage.services';

@Injectable()
export class AuthorizationServices {

  authSubscription: Subject<void>;
  formMessage: string;

  constructor(private _req: RequestServices,
              private _storage: StorageServices) {
    this.authSubscription = new Subject<void>();
  }

  // Method for check if user already logged in
  // TODO: Token expiration validation
  fetchAuth(): boolean {
    return !!this._storage.readItem('inv_token');
  }

  // Primary authorization method
  // TODO: Successful response processing
  signIn(formData): Promise<void> {
    return this._req.post('login', {...formData}, true)
      .then(res => {
        console.log('then', res);
        this.authSubscription.next();
        return;
      }).catch(res => {
        if (res.message) {
          this.formMessage = res.message
        } else {
          this.formMessage = 'Network error'
        }
        this.authSubscription.next();
        return;
      })
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
