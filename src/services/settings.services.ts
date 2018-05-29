import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class SettingsServices {
  constructor(private request: RequestServices) {
  }

  getAccount() {
    return this.request.get('account', true);
  }

  getLanguages() {
    return this.request.get('languages', true);
  }

  save(profile: object) {
    return this.request.post('account/profile', profile, true);
  }

  changeEmail(email: object) {
    return this.request.post('account/email/change', email, true);
  }

  getTimezone() {
    return this.request.get('timezones.json', false);
  }
}
