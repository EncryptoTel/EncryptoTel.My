import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class AssetServices {
  constructor (private _req: RequestServices) {}

  getAssets(): Promise<object> {
    return this._req.get('assets/get', true);
  }

  addAssets(asset): Promise<object> {
    return this._req.post('assets/add', {...asset}, true);
  }

}
