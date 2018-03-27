import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable()
export class LoggerServices {
  log = (data: any, description?: string) => {
    if (!environment.production) {
      description ?
        console.log('===Logger message===\n', data) :
        console.log('===Logger message===\n', `${description}\n`, data);
    }
  }
}
