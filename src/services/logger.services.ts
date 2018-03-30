import {Injectable} from '@angular/core';

import {environment as _env} from '../environments/environment';

@Injectable()
export class LoggerServices {

  // Console messages processing and output
  log = (data: any, description?: string) => {
    if (!_env.production) {
      description ?
        console.log('===Logger message===\n', `${description}\n`, data) :
        console.log('===Logger message===\n', data);
    }
  }
}
