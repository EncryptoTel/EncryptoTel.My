import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class SettingsServices {
  constructor(private request: RequestServices) {}

  getAccount() {
    return this.request.get('account', true);
  }

  getLanguages() {
    return this.request.get('languages', true);
  }

  save(profile) {
    return this.request.post('account/profile', profile, true);
  }
}
