import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {environment as _env} from '../environments/environment';

import {LoggerServices} from './logger.services';

@Injectable()
export class RequestServices {
  constructor(private http: HttpClient,
              private logger: LoggerServices) {}

  post(uri: string, data: object, serverReady: boolean = false) {
    return this.http.post(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}).toPromise()
      .then(response => {
        this.logger.log(response, 'POST-superclass response');
        return Promise.resolve(response);
      }).catch(error => {
        this.logger.log(error, 'POST-superclass response');
        return Promise.reject(error);
      });
  }

  put(uri: string, data: object, serverReady: boolean = false) {
    return this.http.put(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}).toPromise()
      .then(response => {
        this.logger.log(response, 'PUT-superclass response');
        return Promise.resolve(response);
      }).catch(error => {
        this.logger.log(error, 'PUT-superclass response');
        return Promise.reject(error);
      });
  }

  get(uri: string, serverReady: boolean = false) {
    return this.http.get(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(error => {
        this.logger.log(error, 'GET-superclass response');
        return Promise.reject(error);
      });
  }

  del(uri: string, serverReady: boolean = false) {
    return this.http.delete(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`).toPromise()
      .then(response => {
        this.logger.log(response, 'DELETE-superclass response');
        return Promise.resolve(response);
      }).catch(error => {
        this.logger.log(error, 'DELETE-superclass response');
        return Promise.reject(error);
      });
  }

  getWaves(uri: string) {
    return this.http.get(`${_env.waves_api_url}/${uri}`).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(error => {
        this.logger.log(error, 'GET-superclass response');
        return Promise.reject(error);
      });
  }
}
