import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

@Injectable()
export class TransactionsServices {
  constructor(private request: RequestServices) {}

  getTransactions(address: string): Promise<Object> {
    return this.request.getWaves(`transactions/address/${address}/limit/50`, true);
  }

  getCourse(): Promise<Object> {
    return this.request.get('course.json');
  }

  getAddress() {
    return this.request.get('account', true);
  }
}
