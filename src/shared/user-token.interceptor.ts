import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {AuthorizationServices} from '../services/authorization.services';
import {StorageServices} from '../services/storage.services';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(private _services: AuthorizationServices,
              private _storage: StorageServices) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('nodes.wavesnodes.com')) {
      // request = request.clone({
      //   setHeaders: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      if (this._services.fetchAuth()) {
        const auth = this._storage.readItem('_auth_tk');
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
