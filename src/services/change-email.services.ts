import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class ChangeEmailServices {
  constructor(private request: RequestServices) {}

  changeEmail(token: string) {
    return this.request.post('account/email/change/confirm', {token: token}, true);
  }

  confirmChangeEmail(token: string) {
    return this.request.post('account/email/change/confirm', {token: token}, true);
  }
}
