import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class DialogServices {
  constructor(private request: RequestServices) {}
  visible = false;
  time: number;

  stayIn() {
    return this.request.get('account/me', true);
  }
}
