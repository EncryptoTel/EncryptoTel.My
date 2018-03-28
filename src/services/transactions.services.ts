import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

@Injectable()
export class TransactionsServices {
  constructor(private request: RequestServices) {}

  getTransactions(address: string): Promise<Object> {
    return this.request.get(`transactions/address/${address}/limit/15`);
  }

  getCourse(): Promise<Object> {
    return this.request.getJson('course.json');
  }
}
