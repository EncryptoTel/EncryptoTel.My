import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

@Injectable()
export class TransactionsServices {
  constructor(private request: RequestServices) {}

  getTransactions(address: string): Promise<Object> {
    return this.request.getWaves(`transactions/address/${address}/limit/50`, true);
  }

  getCourse(from: string, To: string = 'USD'): Promise<Object> {
    return this.request.get(`currency/course?from=${from}&to=${To}`, true);
  }

  getAddress(): Promise<Object> {
    return this.request.get('account', true);
  }

  getAssetsId(assetId): Promise<Object> {
    return this.request.getWaves(`assets/details/${assetId}`, true)
  }
}
