import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

import {Bonus} from '../models/bonus.model';

@Injectable()
export class BonusesServices {
  constructor(private _req: RequestServices) {}

  // Getting bonuses list
  fetchBonuses(): Promise<Bonus[]> {
    return this._req.get('bonuses', true).then(res => {
      return res['bonuses'] || [];
    }).catch(() => {
      return [];
    })
  }
}
