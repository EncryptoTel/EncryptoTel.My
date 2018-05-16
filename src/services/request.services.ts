import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import {environment as _env} from '../environments/environment';

import {LoggerServices} from './logger.services';
import {StorageServices} from './storage.services';

@Injectable()
export class RequestServices {
  constructor(private http: HttpClient,
              private storage: StorageServices,
              private logger: LoggerServices,
              private router: Router) {
  }

  // Requests superclass method for POST requests
  // TODO: Basic POST request processing. Especially errors processing.
  post(uri: string, data: object, serverReady: boolean = false): Promise<any> {
    return this.http.post(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}).toPromise()
      .then(response => {
        if (this.router.url !== '/sign-in') {
          this.storage.writeItem('last_url', this.router.url);
        }
        this.logger.log(response, 'POST-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'POST-superclass response');
        this.unAuthorizedError(response);
        return Promise.reject(response.error);
      });
  }

  // Requests superclass method for PUT requests
  // TODO: Basic PUT request processing. Especially errors processing.
  put(uri: string, data: object, serverReady: boolean = false): Promise<any> {
    return this.http.put(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}).toPromise()
      .then(response => {
        if (this.router.url !== '/sign-in') {
          this.storage.writeItem('last_url', this.router.url);
        }
        this.logger.log(response, 'PUT-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'PUT-superclass response');
        this.unAuthorizedError(response);
        return Promise.reject(response.error);
      });
  }

  // Requests superclass method for GET requests
  // TODO: Basic GET request processing. Especially errors processing.
  get(uri: string, serverReady: boolean = false): Promise<any> {
    return this.http.get(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`).toPromise()
      .then(response => {
        if (this.router.url !== '/sign-in') {
          this.storage.writeItem('last_url', this.router.url);
        }
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'GET-superclass response');
        this.unAuthorizedError(response);
        return Promise.reject(response.error);
      });
  }

  // Requests superclass method for DELETE requests
  // TODO: Basic DELETE request processing. Especially errors processing.
  del(uri: string, serverReady: boolean = false): Promise<any> {
    return this.http.delete(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`).toPromise()
      .then(response => {
        if (this.router.url !== '/sign-in') {
          this.storage.writeItem('last_url', this.router.url);
        }
        this.logger.log(response, 'DELETE-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.unAuthorizedError(response);
        return Promise.reject(response.error);
      });
  }

  // Requests superclass method for wavesAPI requests
  // TODO: Basic wavesAPI request processing. Especially errors processing.
  getWaves(uri: string, serverReady: boolean = false): Promise<any> {
    return this.http.get(serverReady ? `${_env.waves_api_url}/${uri}` : `assets/json/${uri}`, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }

  postFile(uri: string, data: FormData) {
    const request = new HttpRequest('POST', `${_env.api_url}/${uri}`, data);
    return this.http.request(request).toPromise();
  }

  getEth(uri: string, serverReady: boolean = false): Promise<any> {
    return this.http.get(serverReady ? `${_env.eth_api_url}?${uri}` : `assets/json/${uri}`, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }

  getSwap(uri: string): Promise<any> {
    return this.http.get(`${_env.swap_url}/${uri}`, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }

  getSwapStatus(uri: string): Promise<any> {
    return this.http.get(`${_env.swap_url}/${uri}`, {responseType: 'text'}).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }

  private unAuthorizedError(response) {
    if (response.status === 401) {
      localStorage.removeItem('_auth_tk');
      this.router.navigate(['/sign-in']);
    }
  }
  getWavesRates(period: string): Promise<any> {
    const calcPeriod = () => {
      switch (period) {
        case 'month': {
          return 'time_frame=1440&limit=30'
        }
        case 'week': {
          return 'time_frame=240&limit42'
        }
        case 'day': {
          return 'time_frame=60&limit=24'
        }
      }
    };
    return this.http.get(`${_env.api_url}/currency/courses?` + calcPeriod()).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }
}
