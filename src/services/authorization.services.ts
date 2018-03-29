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

  fetchAuth(): boolean {
    return !!this._storage.readItem('inv_token');
  }

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

  clearMessage(): void {
    this.formMessage = undefined;
    this.authSubscription.next();
  }

  subscribeAuth(): Observable<void> {
    return this.authSubscription.asObservable();
  }
}
