import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

@Injectable()
export class TransactionsServices {
  constructor(private request: RequestServices) {}

  getAddress(): Promise<Object> {
    return this.request.get('account', true);
  }

  getTransactions(address: string): Promise<Object> {
    return this.request.get(`transactions?address=${address}`, true);
  }
}
