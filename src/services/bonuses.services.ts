import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

import {Bonuse} from '../models/bonuse.model';

@Injectable()
export class BonusesServices {
  constructor(private _req: RequestServices) {}

  fetchBonuses(): Promise<Bonuse[]> {
    return this._req.get('bonuses.json').then(res => {
      return res['bonuses'] || [];
    }).catch(() => {
      return [];
    })
  }
}
