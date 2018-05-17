import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

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
        request = request.clone({
          setHeaders: {
            'Authorization': `${auth['token_type']} ${auth['access_token']}`
          }
        })
      }
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (!this.excludeHeaders(request.url) && event.headers.get('Authorization')) {
          const auth = this._storage.readItem('_auth_tk');
          auth['access_token'] = event.headers.get('Authorization').split(' ')[1];
          this._storage.writeItem('_auth_tk', auth);
          this._services.setTokenTimer();
        }
      }
    });
  }
}
