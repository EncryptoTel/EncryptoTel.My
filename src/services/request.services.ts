import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {environment as _env} from '../environments/environment';

import {LoggerServices} from './logger.services';
import {StorageServices} from './storage.services';

@Injectable()
export class RequestServices {
  constructor(private http: HttpClient,
              private storage: StorageServices,
              private logger: LoggerServices) {
  }

  // Requests superclass method for POST requests
  // TODO: Basic POST request processing. Especially errors processing.
  post(uri: string, data: object, serverReady: boolean = false): Promise<any> {
    return this.http.post(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}).toPromise()
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
    return this.http.put(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`, {...data}).toPromise()
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
    return this.http.get(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`).toPromise()
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
    return this.http.delete(serverReady ? `${_env.api_url}/${uri}` : `assets/json/${uri}`).toPromise()
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
  getWavesRates(period: string): Promise<any> {
    const calcPeriod = () => {
      switch (period) {
        case 'month': {
          return '1440/30'
        }
        case 'week': {
          return '240/42'
        }
        case 'day': {
          return '60/24'
        }
      }
    };
    return this.http.get(`https://marketdata.wavesplatform.com/api/candles/WAVES/Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck/` + calcPeriod()).toPromise()
      .then(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.resolve(response);
      }).catch(response => {
        this.logger.log(response, 'GET-superclass response');
        return Promise.reject(response);
      });
  }
}
