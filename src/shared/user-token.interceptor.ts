import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {AuthorizationServices} from '../services/authorization.services';
import {StorageServices} from '../services/storage.services';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(private _services: AuthorizationServices,
              private _storage: StorageServices) {}

  excludeHeaders = (url: string): boolean => {
    return url.includes('nodes.wavesnodes.com') || url.includes('etherscan.io') || url.includes('swap.encryptotel.com')
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.excludeHeaders(request.url)) {
      if (!request.url.includes('api/issues/upload')) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
      }
      if (this._services.fetchAuth()) {
        const auth = this._storage.readItem('_auth_tk');
        // this._services.setTokenTimer();
        request = request.clone({
          setHeaders: {
            'Authorization': `${auth['token_type']} ${auth['access_token']}`
          }
        })
      }
    }
    return next.handle(request);
  }
}
