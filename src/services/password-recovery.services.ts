import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class PasswordRecoveryServices {
  constructor(private _req: RequestServices) {}
  sendResetRequest(form: any): Promise<any> {
    return this._req.post('auth/forgot', {...form}, true)
  }
  resetPassword(form: any): Promise<any> {
    return this._req.post('auth/reset', {...form}, true)
  }
}
