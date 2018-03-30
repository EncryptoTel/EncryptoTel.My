import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {environment as _env} from '../environments/environment';

import {LoggerServices} from './logger.services';

@Injectable()
export class RequestServices {
  constructor(private http: HttpClient,
              private logger: LoggerServices) {}

  // Requests superclass method for POST requests
  // TODO: Basic POST request processing. Especially errors processing.
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

  // Requests superclass method for PUT requests
  // TODO: Basic PUT request processing. Especially errors processing.
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

  // Requests superclass method for GET requests
  // TODO: Basic GET request processing. Especially errors processing.
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

  // Requests superclass method for DELETE requests
  // TODO: Basic DELETE request processing. Especially errors processing.
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

  // Requests superclass method for wavesAPI requests
  // TODO: Basic wavesAPI request processing. Especially errors processing.
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
