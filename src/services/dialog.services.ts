import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class DialogServices {
  constructor(private request: RequestServices) {}

  visible = false;
  isClosed = false;
  time: number;

  stayIn() {
    return this.request.post('account/me', {}, true);
  }
}
