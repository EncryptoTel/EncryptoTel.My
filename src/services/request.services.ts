import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {environment as _env} from '../environments/environment';

import {LoggerServices} from './logger.services';

@Injectable()
export class RequestServices {
  constructor(private http: HttpClient,
              private logger: LoggerServices) {}

  post(uri: string, data: object, serverReady: boolean = false): Promise<any> {
    return this.http.post(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'POST-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'POST-superclass response');
        return Promise.reject(response.error);
      });
  }

  put(uri: string, data: object, serverReady: boolean = false): Promise<any> {
    return this.http.put(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'PUT-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'PUT-superclass response');
        return Promise.reject(response.error);
      });
  }

  get(uri: string, serverReady: boolean = false): Promise<any> {
    return this.http.get(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'GET-superclass response');
        return Promise.reject(response.error);
      });
  }

  del(uri: string, serverReady: boolean = false): Promise<any> {
    return this.http.delete(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'DELETE-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response.error, 'DELETE-superclass response');
        return Promise.reject(response.error);
      });
  }

  getWaves(uri: string, serverReady): Promise<any> {
    return this.http.get(serverReady ? `${_env.waves_api_url}/${uri}` : `assets/json/${uri}`, {responseType: 'json'}).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }
}
